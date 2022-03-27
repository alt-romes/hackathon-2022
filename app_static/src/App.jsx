
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
          <Breadcrumbs mainPage="A" />
          <Routes>
            <Route path='/A' element={<><DynamicTable tableFields={["Name", "Age", "Nationality"]} /><SimpleButton handleClick={() => navigate('/B')} text='Adicionar' /></>} />
            <Route path='/B' element={<><CustomForm formFields={[["Name", 'N'], ["Age", 'N'], ["Nationality", 'L']]} submitRoute='A' submitText='Gravar' /></>} />
            <Route path='/C' element={<><DynamicTable tableFields={["Name", "Age", "Nationality"]} /></>} />
          </Routes>
        </>
      } />

    </div>
  );
}

export default App;

