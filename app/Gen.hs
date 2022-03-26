{-# LANGUAGE LambdaCase #-}
{-# LANGUAGE DerivingStrategies #-}
module Gen where

import Data.List
import Debug.Trace

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

data Component = Component String [(String, String, Bool)]
               | PendingComponent String [(String, String, Bool)]
               deriving (Eq, Ord)

instance Show Component where
    show (Component name props) = "<" <> name <> concatMap (\(x, y, b) -> " " <> x <> "=" <> (if b then "{" else "'") <> y <> if b then "}" else "'") props <> " />"
    show (PendingComponent name props) = error $ "Why are you trying to print a pending component " <> name <> " " <> show props

page2Comp :: Page -> Component
page2Comp (Page (PageName n) ls) = Component "Route" [("path", "/" <> n, False),
                                     ("element", "<>" <> concatMap show (solvePending . map line2Comp $ ls) <> "</>", True)]

solvePending :: [Component] -> [Component]
solvePending = map (fixerComp . mergePending) . groupBy groupPending
    where
        groupPending :: Component -> Component -> Bool
        groupPending (PendingComponent n _) (PendingComponent n' _)
          | n == n' = True
        groupPending _ _ = False

        mergePending :: [Component] -> Component
        mergePending [x] = x
        mergePending (PendingComponent n ps:PendingComponent n' ps':xs)
          | n == n' = mergePending $ Component n (concat $ mergeWith mergeProps ps ps'):xs
        mergePending (Component n ps:PendingComponent n' ps':xs)
          | n == n' = mergePending $ Component n (concat $ mergeWith mergeProps ps ps'):xs
        mergePending _ = error "Undefined behaviour for mergePending"

        mergeProps :: (String, String, Bool) -> (String, String, Bool) -> [(String, String, Bool)]
        mergeProps (s1, s2, b1) (s3, s4, b2)
          | s1 == s3 && b1 == b2 = [(s1, mergeField s1 s2 s4, b1)]
        mergeProps a b = [a, b]

        -- Merge values y and z of field x
        mergeField :: String -> String -> String -> String
        mergeField "fieldNames" y z = y <> ", " <> z
        mergeField x _ _ = error ("Undefined mergeField for " <> x)

        fixerComp :: Component -> Component
        fixerComp (Component n ls) = Component n $ map fixerField ls
        fixerComp (PendingComponent n ls) = error "Why are you trying to fixerComp a pending component?"

        -- Fix value y of field x
        fixerField :: (String, String, Bool) -> (String, String, Bool)
        fixerField ("fieldNames", y, b) = ("fieldNames", "[" <> y <> "]", b)
        fixerField fs = fs -- If field doesn't need fixing don't fix it

        mergeWith :: (a -> a -> [a]) -> [a] -> [a] -> [[a]]
        mergeWith _ xs [] = [xs]
        mergeWith _ [] ys = [ys]
        mergeWith f (x:xs) (y:ys) = f x y:mergeWith f xs ys

line2Comp :: Line -> Component
line2Comp (Table fs l) = Component "Table" [("fields", show $ map (\(FieldName n) -> n) fs, True)]
line2Comp DummyRow = error "impossible"
line2Comp SpaceSplit = Component "SpaceSplit" []
line2Comp (Button str) = Component "Button" [("btntext", str, False)]
line2Comp (FormInput (FieldName n)) = PendingComponent "CustomForm" [("fieldNames", "[" <> show n <> "," <> "'N'" <> "]", True)]
line2Comp (FormLongInput (FieldName n)) = PendingComponent "CustomForm" [("fieldNames", "[" <> show n <> "," <> "L" <> "]", True)]
line2Comp (FormUpload (FieldName n)) = PendingComponent "CustomForm" [("fieldNames", "[" <> show n <> "," <> "'U'" <> "]", True)]
line2Comp (FormSubmit str) = PendingComponent "CustomForm" [("submitText", str, False)]
line2Comp (GoesTo l (PageName p)) = case line2Comp l of
                                      PendingComponent "CustomForm" props -> PendingComponent "CustomForm" (("submitRoute", p, False):props)
                                      Component name props -> Component name (("onClick", "() => navigate('/" <> p <> "')", True):props)
                                      PendingComponent x _ -> error ("Undefined behaviour for pending component " <> x)


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
