import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import PageWrapper from "./pages/PageWrapper";
import SimpleButton from "./components/SimpleButton";
import CustomForm from "./components/CustomForm";
import DynamicTable from "./components/DynamicTable";
import SpaceSplit from "./components/SpaceSplit";

function App() {
  let navigate = useNavigate();
  return (
    <div className="App">
      <PageWrapper props={
          <Routes>
            <Route path="/A" element={<> 
            <DynamicTable tableFields={["Name","Age","Nationality"]} /> 
            <SimpleButton handleClick={() => navigate('B')} text="Submit"/> </>} />
            <Route path="/B" element={<> <CustomForm formFields={[['Name',' N'],['Age','N'],['Nationality','L']]}/> </>}/>
          </Routes>
      } />

    </div>
  );
}

export default App;
