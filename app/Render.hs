{-# LANGUAGE QuasiQuotes #-}
module Render where

import Text.RawString.QQ
import qualified Data.Text as T

import Gen

class Render a where
    render :: a -> String

data App = App [Page]

instance Render App where
    render (App pages) = [r|
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import DynamicTable from "./components/DynamicTable";
import PageWrapper from "./pages/PageWrapper";
import SimpleButton from "./components/SimpleButton";
import CustomForm from "./components/CustomForm";
import SpaceSplit from "./components/SpaceSplit";
function App() {
  let navigate = useNavigate();
  return (
    <div className="App">
      <PageWrapper props={
          <Routes>
    |] <> unlines (map (show . page2Comp) pages) <> [r|
          </Routes>
      } />

    </div>
  );
}

export default App;
    |]
