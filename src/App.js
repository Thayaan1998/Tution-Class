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

import SendPromo from './pages/SendPromo'
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
          setTheme(theme1);
        } else if (document.getElementById("theme").value == "theme2") {
          setTheme(theme2);
        } else if (document.getElementById("theme").value == "theme3") {
          setTheme(theme3);
        }


      }
    }),
    [],
  );

  const theme1 = createTheme({
    palette: {

      primary: blue,
      secondary: red

    },
    typography: {
      useNextVariants: true,
    }

  });

  const theme2 = createTheme({
    palette: {

      primary: purple,
      secondary: red

    },
    typography: {
      useNextVariants: true,
    }

  });

  const theme3 = createTheme({
    palette: {

      primary: pink,
      secondary: red

    },
    typography: {
      useNextVariants: true,
    }

  });


  const [theme, setTheme] = React.useState(theme2);


  return (
    <div className="App">
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>

          <select class="form-select" aria-label="Default select example" style={{ width: '300px' }} id="theme" onClick={colorMode.toggleThemeMode}>
            <option selected>Open this select menu</option>
            <option value="theme1">blue</option>
            <option value="theme2">purple</option>
            <option value="theme3">pink</option>
          </select>
          <Button variant="contained" color="primary">
            Hello
          </Button>
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

              <Route path="/getPostRequirements" element={<GetPostRequirements />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>

      </ColorModeContext.Provider>

    </div>
  );
}

export default App;
