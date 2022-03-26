{-# LANGUAGE DerivingStrategies #-}
module Gen where

import Data.List

newtype PageName  = PageName String  deriving stock (Show)
newtype FieldName = FieldName String deriving stock (Show, Eq, Ord)

data Page = Page PageName [Line]

data Line = Table [FieldName] Line -- dummy row might have GoesTo
          | DummyRow -- to construct table, which can take a line like Line `GoesTo` PageName
          | SpaceSplit
          | Button String
          | FormInput FieldName
          | FormLongInput FieldName
          | FormUpload FieldName
          | FormSubmit String
          | GoesTo Line PageName
          deriving stock (Show)

data Component = Component String [(String, String)]

instance Show Component where
    show (Component name props) = "<" <> name <> concatMap (\(x, y) -> " " <> x <> "=" <> y <> "") props <> " />"

page2Comp :: Page -> Component
page2Comp (Page (PageName n) ls) = Component "Route" [("path", "'/" <> n <> "'"), ("element", "{<>" <> concatMap (show . line2Comp) ls <> "</>}")] -- TODO: move output of line2Comp to individual component

line2Comp :: Line -> Component
line2Comp (Table fs l) = Component "Table" [("fields", show $ map (\(FieldName n) -> n) fs)]
line2Comp DummyRow = error "impossible"
line2Comp SpaceSplit = Component "SpaceSplit" []
line2Comp (Button str) = Component "Button" [("btntext", str)]
line2Comp (FormInput (FieldName n)) = Component "FormInput" [("field", n)]
line2Comp (FormLongInput (FieldName n)) = Component "FormLongInput" [("field", n)]
line2Comp (FormUpload (FieldName n)) = Component "FormUpload" [("field", n)]
line2Comp (FormSubmit str) = Component "FormSubmit" [("btntext", str)]
line2Comp (GoesTo l (PageName p)) = let (Component name props) = line2Comp l in
                                         Component name (("onClick", "{() => navigate(/" <> p <> ")}"):props)


collectFieldNames :: [Page] -> [FieldName]
collectFieldNames pages = rmdups (concatMap collectPage pages)
    where
        collectPage :: Page -> [FieldName]
        collectPage (Page name lines) = concatMap collectLine lines 

        collectLine :: Line -> [FieldName]
        collectLine (Table fs l) = fs
        collectLine (FormInput f) =[f]
        collectLine (FormLongInput f) = [f]
        collectLine (FormUpload f) = [f]
        collectLine _ = []

        rmdups :: (Ord a) => [a] -> [a]
        rmdups = map head . group . sort



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
