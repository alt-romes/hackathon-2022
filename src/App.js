import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import TablePage from "./pages/TablePage";
import PageWrapper from "./pages/PageWrapper";
import { Component } from "react";
import DynamicTable from "./components/DynamicTable";
import RedirectButton from "./components/RedirectButton";

function App() {
  return (
    <div className="App">
      <PageWrapper props={
          <Routes>
            <Route path="/A" element={<> <TablePage /> <RedirectButton page="B"/> </>} />
            <Route path="/B" element={"PAGINA B CUARAGO"}/>
          </Routes>
      } />

    </div>
  );
}

export default App;
