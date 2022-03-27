{-# LANGUAGE QuasiQuotes #-}
module Render where

import Text.RawString.QQ
import qualified Data.Text as T

import Gen

page_name (Page (PageName n) _) = n

class Render a where
    render :: a -> String

newtype App = App [Page]

instance Render App where
    render (App pages) = [r|
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import PageWrapper from "./pages/PageWrapper";
import DynamicTable from "./components/DynamicTable";
import SimpleButton from "./components/SimpleButton";
import CustomForm from "./components/CustomForm";
import Breadcrumbs from "./components/Breadcrumbs";
import SpaceSplit from "./components/SpaceSplit";
function App() {
  let navigate = useNavigate();
  return (
    <div className="App">
      <PageWrapper props={
        <>
    |] <> "<Breadcrumbs mainPage='"
       <> page_name (head pages)
       <> "' /> <Routes>"
       <> unlines (map (show . page2Comp) pages) <> [r|
          </Routes>
        </>
      } />

    </div>
  );
}

export default App;
    |]
