{-# LANGUAGE DerivingStrategies #-}
module Gen where

newtype PageName  = PageName String  deriving stock (Show)
newtype FieldName = FieldName String deriving stock (Show)

data Page = Page PageName [Line] deriving stock (Show)

data Line = Table { tFields   :: [FieldName]
                  , tDummyRow :: Line }
          | DummyRow -- to construct table, which can take a line like Line `GoesTo` PageName
          | SpaceSplit
          | Button String
          | FormInput FieldName
          | FormLongInput FieldName
          | FormUpload FieldName
          | FormSubmit String
          | GoesTo Line PageName
          deriving stock (Show)


pprPage :: Page -> String
pprPage (Page (PageName name) lines) = name <> ":" <> nline <> concatMap ((<> nline) . pprLine) lines <> nline

pprLine :: Line -> String
pprLine (Table (FieldName f:fs) l) = f <+> concatMap (\(FieldName f') -> "|" <+> f') fs <> nline <> "---" <> nline <> pprLine l

pprLine DummyRow = "..."

pprLine SpaceSplit = "==="

pprLine (Button t) = "[" <+> t <+> "]"

pprLine (FormInput (FieldName t)) = ">" <+> t

pprLine (FormLongInput (FieldName t)) = ">>" <+> t

pprLine (FormUpload (FieldName t)) = "^" <+> t

pprLine (FormSubmit t) = "[[" <+> t <+> "]]"

pprLine (l `GoesTo` (PageName n)) = pprLine l <+> "=>" <+> n


nline = "\n"

(<+>) :: String -> String -> String
a <+> b = a <> " " <> b
