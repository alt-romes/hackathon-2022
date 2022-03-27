module Main where

import Gen
import Render
import Parser

main :: IO ()
main = do
    x <- parseFromFile "test2.app"
    case x of
      Left err -> print err
      Right ast -> do
          putStrLn (unwords $ map ((\w -> "'" <> w <> "'") . \(FieldName n) -> n) $ collectFieldNames ast)
          writeFile "_build/src/App.jsx" (render (App ast))
    return ()

