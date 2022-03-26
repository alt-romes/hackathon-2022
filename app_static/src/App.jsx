
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
import Breadcrumbs from "./components/Breadcrumbs";
function App() {
  let navigate = useNavigate();
  return (
    <div className="App">
      <PageWrapper props={
        <>
          <Breadcrumbs />
          <Routes>
            <Route path='/A' element={<><DynamicTable
              tableFields={["Name", "Age", "Nationality"]} /><SpaceSplit
              /><SimpleButton handleClick={() => navigate('/B')} text='Add'
              /></>} />
            <Route path='/B' element={<><SpaceSplit /><CustomForm
              formFields={[["Name", 'N'], ["Age", 'N'], ["Nationality", 'N']]} submitRoute={"A"}
              submitText='Submit' /></>} />
            <Route path='/C' element={<><DynamicTable
              tableFields={["Name", "Age", "Nationality", "Foto", "Conclusao"]}
            /></>} />
          </Routes>
        </>

      } />
    </div>
  );
}

export default App;

