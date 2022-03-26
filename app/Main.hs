module Main where

import Gen
import Render
import Parser

main :: IO ()
main = do
    Right x <- parseFromFile "test.app"
    -- putStrLn (concatMap pprPage $ x)
    -- print (collectFieldNames x)
    writeFile "_build/src/App.js" (render (App x))
    return ()

