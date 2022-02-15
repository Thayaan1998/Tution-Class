import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css"


import Man from './man'
import AddCustomer from './pages/AddCustomer'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        
          <Route path="/man" element={<Man />} />
          <Route path="/addCustomer" element={<AddCustomer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
