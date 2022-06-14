import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';


import { purple, blue, red, pink } from '@mui/material/colors';
const Theme1 = createTheme({
    palette: {

        primary: blue,
        secondary: red

    },
    typography: {
        useNextVariants: true,
    }

});

export default Theme1;
