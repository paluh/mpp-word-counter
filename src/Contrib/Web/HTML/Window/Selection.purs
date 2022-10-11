module Contrib.Web.HTML.Window.Selection where

import Prelude

import Data.Maybe (Maybe)
import Data.Nullable (Nullable)
import Data.Nullable as Nullable
import Effect (Effect)
import Effect.Uncurried (EffectFn1, runEffectFn1)
import Web.HTML.Window (Window)

foreign import data Selection :: Type

foreign import toString :: Selection -> String

foreign import getSelectionImpl :: EffectFn1 Window (Nullable Selection)

getSelection :: Window -> Effect (Maybe Selection)
getSelection = map Nullable.toMaybe <<< runEffectFn1 getSelectionImpl

