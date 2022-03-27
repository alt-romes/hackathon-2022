
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
import Redirect from "./components/Redirect";
import Header from "./components/Header";
function App() {
  let navigate = useNavigate();

  return (
    <div className="App">
      <main>
        <Header pages={["People", "People Form", "Other"]} />
        <PageWrapper props={
          <>
            <Redirect mainPage="People" />
            <Routes>
              <Route path='/People' element={<><DynamicTable tableFields={["Name", "Age", "Nationality"]} /><SimpleButton handleClick={() => navigate('/People Form')} text='Adicionar' /></>} />
              <Route path='/People Form' element={<><CustomForm formFields={[["Name", 'N'], ["Age", 'N'], ["Nationality", 'L']]} submitRoute='People' submitText='Gravar' /></>} />
              <Route path='/Other' element={<><DynamicTable tableFields={["Name", "Age", "Nationality"]} /></>} />
            </Routes>
          </>
        } />
      </main>

    </div>
  );
}

export default App;

