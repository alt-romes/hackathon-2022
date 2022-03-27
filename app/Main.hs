module Main where

import System.Exit

import Gen
import Render
import Parser

main :: IO ()
main = do
    x <- parseFromFile "test2.app"
    case x of
      Left err -> do
          print err
          exitFailure
      Right ast -> do
          writeFile "_build/backend/backend.js" (render (DB $ collectFieldNames ast))
          writeFile "_build/src/App.jsx" (render (App ast))
    return ()

