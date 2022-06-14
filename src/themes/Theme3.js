import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';


import { purple, blue, red, pink } from '@mui/material/colors';

const Theme3 = createTheme({
    palette: {

        primary: pink,
        secondary: red

    },
    typography: {
        useNextVariants: true,
    }

});

export default Theme3;