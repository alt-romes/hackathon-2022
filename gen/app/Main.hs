module Main where

import Gen
import Parser

main :: IO ()
main = do
    Right x <- parseFromFile "test.app"
    putStrLn (concatMap pprPage $ x)
    print (collectFieldNames x)
    putStrLn ""
    putStrLn (unlines $ map ((<> "\n") . show . page2Comp) x)
    return ()

