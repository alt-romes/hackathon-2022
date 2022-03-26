
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
          <Route path='/A' element={<><DynamicTable
            tableFields={["Data", "Protocolo", "ComoCorreu"]} /><SpaceSplit
            /><SimpleButton handleClick={() => navigate('/B')} text='Add'
            /></>} />

          <Route path='/B' element={<><SpaceSplit /><CustomForm
            formFields={[["Data", 'N'], ["Protocolo", 'N'], ["ComoCorreu", 'N'],
            ["Foto", 'U'], ["Conclusao", 'L']]} submitRoute='A'
            submitText='Submit' /></>} />

          <Route path='/C' element={<><DynamicTable
            tableFields={["Data", "Protocolo", "ComoCorreu", "Foto", "Conclusao"]}
          /></>} />

        </Routes>
      } />
    </div>
  );
}

export default App;

