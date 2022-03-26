
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
          <Breadcrumbs />
          <Routes>
            <Route path='/A' element={<><DynamicTable tableFields={["Data","Protocolo","Outcome"]} /><SimpleButton handleClick={() => navigate('/B')} text='Adicionar' /></>} />
            <Route path='/B' element={<><CustomForm formFields={[["Data",'N'], ["BI",'U'], ["Protocolo",'N'], ["ComoCorreu",'N'], ["Foto",'U'], ["Conclusao",'L']]} submitRoute='A' submitText='Gravar' /></>} />
            <Route path='/C' element={<><DynamicTable tableFields={["Data","Protocolo","Outcome","Foto","Conclusao"]} /></>} />
          </Routes>
      } />

    </div>
  );
}

export default App;
    
