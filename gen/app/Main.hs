module Main where

import Gen
import Parser

main :: IO ()
main = do
    Right x <- parseFromFile "test.app"
    putStrLn (concatMap pprPage $ x)
    return ()

