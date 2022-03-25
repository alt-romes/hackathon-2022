module Main where

import Gen
import Parser

main :: IO ()
main = do
    x <- parseFromFile "test.app"
    print x
    return ()

