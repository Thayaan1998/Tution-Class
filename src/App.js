import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css"
import React, { useEffect } from "react";


import Man from './man'
import Reviews from './pages/Reviews'

import CustomerList from './pages/CustomerList'
import Register from './pages/Register'
import PostRequirement from './pages/PostRequirement'
import AskQuestion from './pages/AskQuestion'
import AddSubscribe from './pages/AddSubscribe'
import GetPostRequirements from './pages/GetPostRequirements'
import GetServiceProvider from './pages/GetServiceProvider'
import GetQuotation from './pages/GetQuotation'
import EditProfileServiceProvider from './pages/EditProfileServiceProvider'
import EditAgentPeofile from './pages/EditAgentPeofile'
import Dashboard from './pages/Dashboard'

import PackagePage from './pages/PackagePage'
import PackDetails from './pages/PackageDescription'
import Payment from './pages/Payment'




import Theme1 from './themes/Theme1'
import Theme2 from './themes/Theme2'
import Theme3 from './themes/Theme3'

import ChangePackage from './pages/ChangePackage'


import SendPromo from './pages/SendPromo'
import GetQuestions from './pages/GetQuestions'

import AcceptAgentAndServiceProviders from './pages/AcceptAgentAndServiceProviders'

import Profile from './pages/Profile'

import Login from './pages/Login'
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';


import { purple, blue, red, pink } from '@mui/material/colors';


import Button from '@mui/material/Button';


const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

function App() {
  const colorMode = React.useMemo(
    () => ({
      toggleThemeMode: () => {

        if (document.getElementById("theme").value == "theme1") {
          // setTheme(theme1);
        } else if (document.getElementById("theme").value == "theme2") {
          // setTheme(theme2);
        } else if (document.getElementById("theme").value == "theme3") {
          // setTheme(theme3);
        }


      }
    }),
    [],
  );




  const [theme, setTheme] = React.useState(Theme1);

  useEffect(() => {
    if (localStorage.getItem("theme") === "theme1") {
      setTheme(Theme1);
    } else if (localStorage.getItem("theme") === "theme2") {
      setTheme(Theme2);
    }else if (localStorage.getItem("theme") === "theme3") {
      setTheme(Theme3);
    }
  }, []);

  return (
    <div className="App">
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>

          <BrowserRouter>
            <Routes>

              <Route path="/man" element={<Man />} />
              <Route path="/customerList" element={<CustomerList />} />
              <Route path="/register" element={<Register />} />
              <Route path="/register" element={<Register />} />
              <Route path="/postRequirement" element={<PostRequirement />} />
              <Route path="/askQuestion" element={<AskQuestion />} />
              <Route path="/addSubscribe" element={<AddSubscribe />} />
              <Route path="/sendPromo" element={<SendPromo />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/changePackage" element={<ChangePackage />} />
              <Route path="/getServiceProviders" element={<GetServiceProvider />} />
              <Route path="/getQuotation" element={<GetQuotation />} />
              <Route path="/editProfileServiceProvider" element={<EditProfileServiceProvider />} />
              <Route path="/editAgentProfile" element={<EditAgentPeofile />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path='/packages' element={<PackagePage/>}/>
              <Route path='/getquestion' element={<GetQuestions/>}/>

              <Route path='/packages_details/:id' element={<PackDetails/>}/>
              <Route path='/payment/:id' element={<Payment/>}/>



              <Route path="/acceptAgentAndServiceProviders" element={<AcceptAgentAndServiceProviders />} />
              <Route path="/getPostRequirements" element={<GetPostRequirements />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>

      </ColorModeContext.Provider>

    </div>
  );
}

export default App;
