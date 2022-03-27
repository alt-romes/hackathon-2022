module Parser where

import Control.Monad
import Gen
import Text.Parsec hiding (Line)
import qualified Text.Parsec.Expr as Ex 
import Data.List

import Lexer

manyIdentifiers :: Parser String
manyIdentifiers = unwords <$> many1 identifier

pageName :: Parser PageName
pageName = PageName . intercalate "_" <$> many1 identifier

fieldName :: Parser FieldName
fieldName = FieldName <$> manyIdentifiers

table :: Parser Line
table = do
    n1 <- fieldName
    ns <- many1 $ do
        reservedOp "|"
        fieldName
    many1 (symbol "=")
    Table (n1:ns) <$> line

dummyRow :: Parser Line
dummyRow = do
    try $ many1 (symbol "-")
    return DummyRow

split :: Parser Line
split = do
    many1 (symbol "=")
    return SpaceSplit

button :: Parser Line
button = Button <$> try (brackets manyIdentifiers)

formInput :: Parser Line
formInput = do
    reservedOp ">"
    FormInput <$> fieldName

formLongInput :: Parser Line
formLongInput = do
    reservedOp ">>"
    FormLongInput <$> fieldName

formUpload :: Parser Line
formUpload = do
    reservedOp "^"
    FormUpload <$> fieldName

formSubmit :: Parser Line
formSubmit = FormSubmit <$> try (doublebrackets manyIdentifiers)
    where
    doublebrackets = between (symbol "[[") (symbol "]]")

line :: Parser Line
line = do
    l <- table <|> dummyRow <|> split <|> button <|> formInput <|> formLongInput <|> formUpload <|> formSubmit 
    option l $ do
        reservedOp "=>"
        pn <- pageName
        return (l `GoesTo` pn)

page :: Parser Page
page = do
    reservedOp ":"
    n <- pageName
    reservedOp ":"
    lines <- many1 (try line)
    return (Page n lines)

parseFromFile :: FilePath -> IO (Either ParseError [Page])
parseFromFile fname = do
    input <- readFile fname
    return (runParser (contents $ many1 page) () fname input)
