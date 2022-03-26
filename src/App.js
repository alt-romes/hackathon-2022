import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import TablePage from "./pages/TablePage";
import PageWrapper from "./pages/PageWrapper";
import RedirectButton from "./components/RedirectButton";
import CustomForm from "./components/CustomForm";

function App() {
  let navigate = useNavigate();
  return (
    <div className="App">
      <PageWrapper props={
          <Routes>
            <Route path="/A" element={<> <TablePage fieldNames={["Name","Age","Nationality"]} /> <RedirectButton page="B"/> </>} />
            <Route path="/B" element={<> <CustomForm fieldNames={[['Name',' N'],['Age','N'],['Nationality','L']]}/> </>}/>
          </Routes>
      } />

    </div>
  );
}

export default App;
