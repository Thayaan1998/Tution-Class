import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';


import { purple, blue, red, pink } from '@mui/material/colors';

const Theme2 = createTheme({
    palette: {

        primary: purple,
        secondary: red

    },
    typography: {
        useNextVariants: true,
    }

});

export default Theme2;
