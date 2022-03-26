import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import PageWrapper from "./pages/PageWrapper";
import SimpleButton from "./components/SimpleButton";
import CustomForm from "./components/CustomForm";
import DynamicTable from "./components/DynamicTable";

function App() {
  let navigate = useNavigate();
  return (
    <div className="App">
      <PageWrapper props={
          <Routes>
            <Route path="/A" element={<> <DynamicTable fieldNames={["Name","Age","Nationality"]} /> <SimpleButton page="B"/> </>} />
            <Route path="/B" element={<> <CustomForm fieldNames={[['Name',' N'],['Age','N'],['Nationality','L']]}/> </>}/>
          </Routes>
      } />

    </div>
  );
}

export default App;
