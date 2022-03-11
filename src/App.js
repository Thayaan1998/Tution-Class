import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css"


import Man from './man'
import CustomerList from './pages/CustomerList'
import Register from './pages/Register'



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        
          <Route path="/man" element={<Man />} />
          <Route path="/customerList" element={<CustomerList />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
