import "@fontsource-variable/rubik";

import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    //hmm allVariants seem to work
    allVariants: {
      fontFamily: "Rubik Variable, sans-serif",
      fontSize: 16,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 375,
      md: 900,
      lg: 1280,
      xl: 1440,
    },
  },
  palette: {
    background: {
      default: "hsl(228, 33%, 97%)",
    },
    primary: {
      main: "hsl(238, 40%, 52%)", //moderateBlue
      light: "hsl(239, 57%, 85%)", //lightGrayishBlue
    },
    secondary: {
      main: "hsl(212, 24%, 26%)", //darkBlue
      light: "hsl(211, 10%, 45%)", //grayishBlue
    },
    error: {
      main: "hsl(358, 79%, 66%)", //softRed
      light: "hsl(357, 100%, 86%)", //paleRed
    },
    grey: {
      50: "hsl(223, 19%, 93%)", //lightGray
      100: "hsl(228, 33%, 97%)", //veryLightGray
    },
  },
  components: {
    //NOTE keeping the commented out code for reference
    // MuiButton: {
    //   styleOverrides: {
    //     root: {
    //       ":hover": { opacity: 0.8 },
    //     },
    //   },
    // },
  },
});

export default theme;
