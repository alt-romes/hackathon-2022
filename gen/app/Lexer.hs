module Lexer where

import Text.Parsec
import qualified Text.Parsec.Token as Tok
import Text.Parsec.Language

type Parser = Parsec String ()

lexer :: Tok.TokenParser ()
lexer = Tok.makeTokenParser style
  where
    names = []
    ops = ["|", ":", ">", ">>", "^", "=>"]
    style = haskellDef { Tok.reservedOpNames = ops
                       , Tok.reservedNames = names
                       , Tok.commentLine = "#"
                       }

contents :: Parser a -> Parser a
contents p = do
    Tok.whiteSpace lexer
    r <- p
    eof
    return r

reserved :: String -> Parser ()
reserved = Tok.reserved lexer

reservedOp :: String -> Parser ()
reservedOp = Tok.reservedOp lexer

identifier :: Parser String
identifier = Tok.identifier lexer

symbol :: String -> Parser String
symbol = Tok.symbol lexer

brackets :: Parser a -> Parser a
brackets = Tok.brackets lexer
