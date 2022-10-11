let mkPackage =
      https://raw.githubusercontent.com/purescript/package-sets/psc-0.13.0-20190626/src/mkPackage.dhall sha256:0b197efa1d397ace6eb46b243ff2d73a3da5638d8d0ac8473e8e4a8fc528cf57

let upstream =
      https://github.com/purescript/package-sets/releases/download/psc-0.15.2-20220530/packages.dhall sha256:15dd8041480502850e4043ea2977ed22d6ab3fc24d565211acde6f8c5152a799

in  upstream
  with
    simple-csv = ../purescript-simple-csv/spago.dhall as Location
      -- mkPackage
      --   [ "prelude"
      --   , "foldable-traversable"
      --   , "strings"
      --   , "console"
      --   , "psci-support"
      --   ]
      --   "https://github.com/fujisawa/purescript-simple-csv.git"
      --   "v0.2.0"
  with
    react-basic-hooks = mkPackage
      [ "aff"
      , "aff-promise"
      , "bifunctors"
      , "console"
      , "control"
      , "datetime"
      , "effect"
      , "either"
      , "exceptions"
      , "foldable-traversable"
      , "functions"
      , "indexed-monad"
      , "integers"
      , "maybe"
      , "newtype"
      , "now"
      , "nullable"
      , "ordered-collections"
      , "prelude"
      , "react-basic"
      , "refs"
      , "tuples"
      , "type-equality"
      , "unsafe-coerce"
      , "unsafe-reference"
      , "web-html"
      ]
      "https://github.com/megamaddu/purescript-react-basic-hooks.git"
      "e7494bd4656b4a43c2efc69bf5f512e154f05cc1"
  with
    array-builder =
      mkPackage
        [ "arrays"
        , "assert"
        , "console"
        , "effect"
        , "foldable-traversable"
        , "maybe"
        , "nullable"
        , "prelude"
        ]
        "https://github.com/paluh/purescript-array-builder.git"
        "v0.1.2"
