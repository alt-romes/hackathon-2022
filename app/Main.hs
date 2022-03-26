module Main where

import Gen
import Render
import Parser

main :: IO ()
main = do
    x <- parseFromFile "test.app"
    case x of
      Left err -> print err
      Right ast -> writeFile "_build/src/App.js" (render (App ast))
    -- putStrLn (concatMap pprPage $ x)
    -- print (collectFieldNames x)
    -- writeFile "_build/src/App.js" (render (App x))
    return ()

