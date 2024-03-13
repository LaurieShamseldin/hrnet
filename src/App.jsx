// == Import modules
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Employee from './pages/Employee';
import CreateEmployee from './pages/CreateEmployee';

// == Composant
const App = () => {


  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Employee />} />
        <Route path="/create-employee" element={ <CreateEmployee />} />
      </Routes>
    </div>
  );
};

export default App;
