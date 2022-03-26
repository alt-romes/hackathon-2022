module Main where

import Gen
import Render
import Parser

main :: IO ()
main = do
    x <- parseFromFile "test.app"
    case x of
      Left err -> print err
      Right ast -> do
          putStrLn (unwords $ map (\(FieldName n) -> n) $ collectFieldNames ast)
          writeFile "_build/src/App.js" (render (App ast))
    return ()

