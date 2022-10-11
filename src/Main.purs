module Main where

import Prelude

import Contrib.Web.HTML.Window.Selection (getSelection)
import Contrib.Web.HTML.Window.Selection as Selection
import Control.Monad.Except (runExcept)
import Control.Monad.Maybe.Trans (MaybeT(..), runMaybeT)
import Control.Monad.State (execState, runState)
import Control.Monad.State as State
import Control.Monad.Trans.Class (lift)
import Data.Array (catMaybes, foldMap, mapWithIndex, sortWith, uncons, (!!))
import Data.Array as Array
import Data.Array.Builder as AB
import Data.Array.NonEmpty as NonEmptyArray
import Data.Either (Either(..), hush)
import Data.Foldable (fold, foldl, for_, length, null)
import Data.FoldableWithIndex (foldMapWithIndex, forWithIndex_)
import Data.Function.Uncurried (Fn2, runFn2)
import Data.Map (Map)
import Data.Map as Map
import Data.Map.Internal as Map.Internal
import Data.Maybe (Maybe(..), fromMaybe, isJust, maybe)
import Data.Monoid as Monoid
import Data.Newtype (un, class Newtype)
import Data.Newtype as Newtype
import Data.Profunctor.Join (Join(..))
import Data.Set (Set)
import Data.Set as Set
import Data.String as String
import Data.String.Regex (Regex)
import Data.String.Regex (match, replace) as Regex
import Data.String.Regex.Flags (global, ignoreCase) as Regex
import Data.String.Regex.Unsafe (unsafeRegex) as Regex
import Data.Traversable (for, traverse)
import Data.Tuple (Tuple(..), curry, snd)
import Data.Tuple.Nested ((/\))
import Debug (traceM)
import Effect (Effect)
import Effect.Aff (launchAff_)
import Effect.Class (liftEffect)
import Effect.Exception (throw)
import Effect.Ref as Ref
import Foreign as Foreign
import Foreign.Object as Foreign
import Foreign.Object as Object
import MPP (raw)
import React.Basic (JSX)
import React.Basic.DOM (button, css, render)
import React.Basic.DOM (div, div_, hr, input, label, li, table, tbody_, td, td_, text, th_, thead_, tr_, ul) as DOM
import React.Basic.DOM.Events (preventDefault, targetFiles, targetValue) as DOM
import React.Basic.Events (handler) as DOM
import React.Basic.Hooks (Component, component, useMemo, useState)
import React.Basic.Hooks as Hooks
import Text.CSV as CSV
import Web.Event.Event (EventType(..))
import Web.Event.EventTarget (addEventListener, eventListener, removeEventListener)
import Web.File.File as File
import Web.File.FileList as FileList
import Web.File.FileReader (fileReader)
import Web.File.FileReader as FileReader
import Web.HTML (window)
import Web.HTML.HTMLDocument (body)
import Web.HTML.HTMLElement (toElement)
import Web.HTML.Window (document)

newtype Ignored = Ignored (Array String)
derive instance Newtype Ignored _
derive newtype instance Semigroup Ignored
derive newtype instance Monoid Ignored

type Index = Set ColumnCellId

newtype Interesting = Interesting (Maybe { index :: Index , words :: Map String Index })
derive instance Newtype Interesting _
derive newtype instance Semigroup Interesting
derive newtype instance Monoid Interesting

newtype Phrases = Phrases (Set String)
derive instance Newtype Phrases _
derive instance Eq Phrases
derive newtype instance Semigroup Phrases
derive newtype instance Monoid Phrases

addToInteresting :: String -> Index -> Interesting -> Interesting
addToInteresting newWord newIndex (Interesting Nothing) = Interesting
  (Just $ { index: newIndex, words: Map.singleton newWord newIndex })
addToInteresting newWord newIndex (Interesting (Just { index, words })) = do
  Interesting $ Just $
    { words: Map.insert newWord newIndex words
    , index: index `Set.intersection` newIndex
    }

wordInInteresting :: String -> Interesting -> Boolean
wordInInteresting word (Interesting Nothing) = false
wordInInteresting word (Interesting (Just { words } )) = isJust (word `Map.lookup` words)

inTheIndex :: ColumnCellId -> Interesting -> Boolean
inTheIndex _ (Interesting Nothing) = true
inTheIndex columnCellId (Interesting (Just { index })) = columnCellId `Set.member` index

removeFromInteresting :: String -> Interesting -> Interesting
removeFromInteresting word (Interesting interesting) = Interesting do
  { words } <- interesting
  (_ /\ words') <- word `Map.pop` words
  { head, tail } <- words' # Map.toUnfoldable >>> map snd >>> Array.uncons
  pure
    { words: words'
    , index: foldl Set.intersection head tail
    }


newtype WordIndex = WordIndex (Map String (Set ColumnCellId))
derive instance Newtype WordIndex _
derive newtype instance Semigroup WordIndex
derive newtype instance Monoid WordIndex

-- newtype StatsStore = UpdateStats Key WordCount

newtype Header = Header String
derive instance Eq Header
derive instance Ord Header
derive instance Newtype Header _

newtype ColumnCellId = ColumnCellId Int
derive instance Eq ColumnCellId
derive instance Ord ColumnCellId
derive instance Newtype ColumnCellId _

newtype ColumnCell = ColumnCell
  { content :: String
  , id :: ColumnCellId
  }
derive instance Eq ColumnCell
derive instance Ord ColumnCell
derive instance Newtype ColumnCell _

wordsRegex :: Regex
wordsRegex = Regex.unsafeRegex "\\w+" Regex.global

type StatsTableActions =
  { addToIgnored :: String -> Effect Unit
  , addToInteresting :: String -> Index -> Effect Unit
  , removeFromInteresting :: String -> Effect Unit
  , removeFromPhrases :: String -> Effect Unit
  -- , setPhrases :: Set String -> Effect Unit
  }

statsTable :: ColumnState -> StatsTableActions -> JSX
statsTable (ColumnState { wordStats: WordIndex stats, ignored: Ignored ignored, interesting, phrases: Phrases phrases }) actions = do
  let
    overlaps = fromMaybe (const true) do
      let
        Interesting i = interesting
      i' <- i
      pure \wi -> not <<< null $ i'.index `Set.intersection` wi
    stats' = Array.reverse <<< sortWith ((length :: _ -> Int) <<< snd) <<< AB.unsafeBuild <<< foldMapWithIndex (curry AB.cons) $ stats

  DOM.table $ { children: _, className: "table" } $
    [ DOM.thead_ $ Array.singleton $ DOM.tr_ [ DOM.th_ [ DOM.text "show in context"], DOM.th_ [ DOM.text "phrase" ] , DOM.th_ [ DOM.text "count" ], DOM.th_ [] ]
    , DOM.tbody_ $ stats' # map \(word /\ index) -> if word `Array.elem` ignored || not (overlaps index)
      then mempty
      else DOM.tr_
        [ DOM.td_ $ Array.singleton $ DOM.input $ do
            let
              isInteresting = word `wordInInteresting` interesting
              onChange = DOM.handler DOM.targetValue \_ -> do
                if isInteresting
                  then actions.removeFromInteresting word
                  else actions.addToInteresting word index
            { onChange, type: "checkbox", className: "form-check-input rounded-0", checked: isInteresting, id: "show-body" }
        , DOM.td_ [ DOM.text word ]
        , DOM.td_ [ DOM.text $ show $ (length index  :: Int) ]
        , DOM.td_ $ Array.singleton
          if String.toLower word `Set.member` phrases
            then do
              let
                onClick = DOM.handler (DOM.preventDefault >>> DOM.targetValue) \value -> actions.removeFromPhrases word
              button { type: "button",  className: "btn-close btn-small", onClick, children: []}
            else
              mempty
        ]
    ]

foreign import escapeRegExp :: String -> String
foreign import matchAllImpl :: Fn2 Regex String (Array (Foreign.Object String))
matchAll = runFn2 matchAllImpl

countStats :: Array ColumnCell -> Phrases -> WordIndex
countStats cells (Phrases phrases) = do
  let
    match content = case map escapeRegExp <<< Array.fromFoldable $ phrases of
      [] -> do
        let
          extractResult = NonEmptyArray.toArray >>> catMaybes >>> map String.toLower
        maybe [] extractResult $ Regex.match wordsRegex content
      phrases' -> do
        let
          pattern = "(?:[^0-9a-za-z]|^)(?<phrase>" <> Array.intercalate "|" phrases' <> "|\\w+)(?:[^a-za-z0-9]|$)"
          regex =Regex.unsafeRegex pattern (Regex.global <> Regex.ignoreCase)
        catMaybes <<< map (Object.lookup "phrase") <<< matchAll regex $ content


    stats :: Map String (Set ColumnCellId)
    stats = cells `flip foldMap` \(ColumnCell { id, content }) -> do
      let
        words' = match content
      flip foldMap words' \word ->
        Map.singleton word $ Set.singleton id
  WordIndex stats

newtype ColumnState = ColumnState
  { ignored :: Ignored
  , cells :: Array ColumnCell
  , isClosedQuestion :: Boolean
  , wordStats :: WordIndex
  , phrases :: Phrases
  , interesting :: Interesting
  }

fromWordIndex :: WordIndex -> Array ColumnCell -> ColumnState
fromWordIndex wordStats cells = ColumnState
  { cells
  , ignored: Ignored []
  , isClosedQuestion: false
  , phrases: Phrases mempty
  , wordStats
  , interesting: mempty
  }

-- | FIXME:
-- | We just reset interesting state - this is simpler strategy then filtering them out
-- | or using proper filtering logic during the UI rendering.
setPhrases :: Phrases -> ColumnState -> ColumnState
setPhrases phrases c@(ColumnState r) = do
  if phrases /= r.phrases
    then do
      let
        stats = countStats r.cells phrases
      ColumnState $ r { phrases = phrases, wordStats = stats, interesting = mempty }
    else c

addPhrase :: String -> ColumnState -> ColumnState
addPhrase str c@(ColumnState r) = do
  let
    phrases = Newtype.over Phrases (Set.insert $ String.toLower str) r.phrases
  setPhrases phrases c

removePhrase :: String -> ColumnState -> ColumnState
removePhrase str c@(ColumnState r) = do
  let
    phrases = Newtype.over Phrases (Set.delete $ String.toLower str) r.phrases
    ColumnState r' = setPhrases phrases c
  ColumnState r' { isClosedQuestion = false }

setClosedQuestion :: Boolean -> ColumnState -> ColumnState
setClosedQuestion setClosed c@(ColumnState r) = do
  if r.isClosedQuestion == setClosed
    then c
    else do
      let
        phrases = if setClosed
          then
            Phrases <<< Set.fromFoldable <<< map (String.toLower <<< _.content <<< un ColumnCell) $ r.cells
          else
            mempty
        ColumnState r' = setPhrases phrases c
      ColumnState r' { isClosedQuestion = setClosed }

hoistMaybe :: forall b m. Monad m => Maybe b -> MaybeT m b
hoistMaybe = MaybeT <<< pure

mkSheetIndexerComponent :: Component { csvFile :: String }
mkSheetIndexerComponent = do
  component "HelloComponent" \{ csvFile } -> Hooks.do
    let
      toColumnCell :: Int -> String -> ColumnCell
      toColumnCell id content = ColumnCell { id: ColumnCellId id, content }

    csv <- useMemo csvFile \_ -> do
      rows <- hush $ CSV.parse csvFile
      { head: rawHeaders, tail: rawRows } <- uncons rows


      let
        headers = map Header rawHeaders
        exec = flip execState (Map.fromFoldable $ map (Header >>> flip Tuple []) rawHeaders) <<< runMaybeT
        columns =  exec do
          forWithIndex_ headers \columnIdx header -> do
            forWithIndex_ rawRows \rowIdx row -> do
              column <- MaybeT $ State.gets (Map.lookup header)
              cell <- hoistMaybe $ row !! columnIdx
              State.modify_ (Map.insert header (column <> [ toColumnCell rowIdx cell ]))

      pure { headers, columns }

    selectedColumn /\ setSelectedColumn <- useState Nothing
    columnsWordIndex /\ setColumnWordIndex <- useState Map.empty

    Hooks.useEffect [ csvFile ] do
       setSelectedColumn (const Nothing)
       setColumnWordIndex (const Map.empty)
       pure (pure unit)

    let
      computeStats :: Header -> _
      computeStats header = setColumnWordIndex $ flip Map.alter header case _ of
        Nothing -> do
          { columns } <- csv
          column <- header `Map.lookup` columns
          let
            stats = countStats column mempty
          Just $ fromWordIndex stats column
        Just x -> Just x

      addToIgnored header word = setColumnWordIndex $ flip Map.alter header case _ of
        Nothing -> Nothing
        Just (ColumnState r) -> Just $ ColumnState $ r { ignored = Newtype.over Ignored (Array.cons word) r.ignored }

      addToInteresting' header word index = setColumnWordIndex $ flip Map.alter header case _ of
        Nothing -> Nothing
        Just (ColumnState r) -> Just $ ColumnState $ r { interesting = addToInteresting word index r.interesting }

      removeFromInteresting' header word = setColumnWordIndex $ flip Map.alter header case _ of
        Nothing -> Nothing
        Just (ColumnState r) -> Just $ ColumnState $ r { interesting = removeFromInteresting word r.interesting }

      addToPhrases header str = setColumnWordIndex $ flip Map.alter header case _ of
        Nothing -> Nothing
        Just c -> Just $ addPhrase str c

      removeFromPhrases header str = setColumnWordIndex $ flip Map.alter header case _ of
        Nothing -> Nothing
        Just c -> Just $ removePhrase str c

      -- setPhrases header phrases = setColumnWordIndex $ flip Map.alter header case _ of
      --   Nothing -> Nothing
      --   Just c -> Just $ setPhrases phrases c

      setClosedQuestion' header flag = setColumnWordIndex $ flip Map.alter header case _ of
        Nothing -> Nothing
        Just c -> Just $ setClosedQuestion flag c


    pure $ DOM.div $ { children: _, className: "container" } case csv of
      Just { headers, columns } -> do
        [ DOM.ul $ { className: "list-group flex-wrap list-group-horizontal", children: _ } $ headers <#> \header -> do
            let
              active = Just header == selectedColumn
              headerStr = un Header header
              inputId = "input-" <> headerStr
              onChange = DOM.handler (DOM.targetValue) \_ -> do
                setSelectedColumn $ const $ if active
                  then Nothing
                  else Just header
                case header `Map.lookup` columnsWordIndex of
                  Nothing -> do
                    launchAff_ $ liftEffect do
                      computeStats header
                  Just _ -> pure unit
            DOM.li $ { children: _, className: "border-1 list-group-item flex-fill m-1" <> Monoid.guard active " active", _aria: Object.fromHomogeneous { "current": show active }} $
              [ DOM.input { className: "rounded-0 form-check-input me-2", type: "checkbox", value: "", id: inputId, onChange, checked: active }
              , DOM.label { htmlFor: inputId, children: [DOM.text (un Header header)] }
              ]

        , DOM.div <<< { className: "mt-5 container justify-content-betweeen", children: _ } <<< Array.singleton <<< DOM.div <<< { className: "row", children: _ } $ do
            join $ Array.fromFoldable selectedColumn <#> \column -> do
                let
                  columnStyle = css { maxHeight: "500px", overflowY: "scroll" }
                [ DOM.div $ { className: "col", style: columnStyle, children: _ } <<< Array.singleton $
                    case column `Map.lookup` columnsWordIndex of
                      Nothing -> DOM.text "Hmmmm... we should start recomputing in a moment..."
                      Just columnState -> statsTable
                        columnState
                        { addToIgnored: addToIgnored column
                        , addToInteresting: addToInteresting' column
                        , removeFromInteresting: removeFromInteresting' column
                        , removeFromPhrases: removeFromPhrases column
                        }
                , fromMaybe mempty do
                    columnCells <- column `Map.lookup` columns
                    let
                      step = case column `Map.lookup` columnsWordIndex of
                        -- FIXME: Split rows into columns upfront
                        Just (ColumnState { interesting }) ->
                          \(ColumnCell { id: columnCellId }) -> columnCellId `inTheIndex` interesting
                        Nothing -> const true

                      columnCells' = Array.filter step columnCells

                      interestingWords = do
                        ColumnState { interesting: Interesting interesting } <- column `Map.lookup` columnsWordIndex
                        { words } <- interesting
                        pure words

                      mark = fromMaybe identity $ interestingWords <#> Map.Internal.keys >>> Array.fromFoldable >>> \words -> do
                        let
                          -- This is faster but... ignores overlaps (learn|cardano) would mark only "*learn* cardano"
                          -- pattern = "([^a-zA-Z]|^)(" <> Array.intercalate "|" words <> ")([^a-zA-Z]|$)"
                          mkPattern word = "([^a-zA-Z]|^)(" <> word <> ")([^a-zA-Z]|$)"
                          mkRegex pattern = Regex.unsafeRegex pattern (Regex.global <> Regex.ignoreCase)
                          mkReplace markRegex = Regex.replace markRegex "$1<b>$2</b>$3"
                          replaces = words <#> mkPattern >>> mkRegex >>> mkReplace >>> Join
                          Join replaceAll = fold replaces

                        replaceAll

                      tableBodyRows = columnCells' <#> \(ColumnCell { content }) -> do
                        let
                          onMouseUp = DOM.handler DOM.targetValue \_ -> do
                             w <- window
                             Selection.getSelection w >>= map Selection.toString >>> case _ of
                                Just phrase -> do
                                  addToPhrases column phrase
                                  traceM phrase
                                Nothing -> pure unit
                        DOM.tr_ [ DOM.td { onMouseUp, dangerouslySetInnerHTML: { __html: mark content }}]

                    pure $ DOM.div $ { className: "col", style: columnStyle, children: _ } $ Array.singleton $
                      DOM.table $ { className: "table", children: _ }
                        [ DOM.thead_ $ Array.singleton $ DOM.tr_ $ Array.singleton $ DOM.th_ $ Array.singleton $ DOM.div $ { className: "row", children: _ }
                            [ DOM.div $ { className: "col", children: _ } do
                              let
                                isClosedQuestion = fromMaybe false do
                                  ColumnState { isClosedQuestion } <- Map.lookup column columnsWordIndex
                                  pure isClosedQuestion
                                inputId = "make-choices-id"
                                onChange = DOM.handler DOM.targetValue $ const do
                                   setClosedQuestion' column (not isClosedQuestion)
                              [ DOM.label { htmlFor: inputId, className: "me-2", children: [DOM.text "Closed question"] }
                              , DOM.input { className: "rounded-0 form-check-input", type: "checkbox", value: "", id: inputId, onChange, checked: isClosedQuestion }
                              ]
                            , DOM.div $ { className: "col", children: _ }
                              [ DOM.label { className: "me-2", children: [DOM.text "Matching"] }
                              , DOM.text $ show (length columnCells' :: Int)
                              ]
                            ]
                        , DOM.tbody_ $ tableBodyRows
                        ]
                ]
        ]

      Nothing -> [ DOM.text "parsing error" ]


mkAppComponent :: Component { exampleCSV :: String }
mkAppComponent = do
  sheetIndexerComponent <- mkSheetIndexerComponent
  component "App" \{ exampleCSV } -> Hooks.do
    csv /\ setCsv <- useState exampleCSV
    let
      onChange = DOM.handler DOM.targetFiles $ (_ >>= FileList.item 0) >>> case _ of
        Just file -> do
          ref <- Ref.new Nothing
          reader <- fileReader
          let
            loadEventType = EventType "load"
            readerEventTarget = FileReader.toEventTarget reader
          listener <- eventListener \_ -> do
            void $ Ref.read ref >>= traverse (\l -> removeEventListener loadEventType l false readerEventTarget)
            FileReader.result reader >>= Foreign.readString >>> runExcept >>> case _ of
              Right newCsv -> setCsv (const newCsv)
              Left _ -> pure unit
          addEventListener loadEventType listener false readerEventTarget
          Ref.write (Just listener) ref
          FileReader.readAsText (File.toBlob file) reader

        Nothing -> pure unit
    pure $
      DOM.div_
        [ DOM.div $ { className: "container", children: _ } <<< Array.singleton $
            DOM.div $ { className: "col", children: _ } $
              [ DOM.div $ { className: "my-3", children: _ } $
                [ -- [ DOM.label { className: "mb-1", htmlFor: "upload-file", children: [ DOM.text $ "Load your csv file..." ]}
                DOM.input { className: "rounded-0 form-control", type: "file", id: "upload-file", onChange, accept: ".csv" }
                ]
              ]
        , DOM.hr {}
        , sheetIndexerComponent { csvFile: csv }
        ]


main :: Effect Unit
main = do
  body <- body =<< document =<< window
  case body of
    Nothing -> throw "Could not find body."
    Just b -> do
      app <- mkAppComponent
      render (app { exampleCSV: raw }) (toElement b)


