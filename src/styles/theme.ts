import { createTheme } from "@mui/material/styles";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#9155fd",
    },
    grey: {
      50: "#dedede",
    },
    background: {
      default: "#f4f5fa",
    },
    text: {
      // primary: "#000000d9",
      primary: "#534f5a",
      secondary: "#00000094",
      disabled:"#00000061"
    },
  },
  typography: {
    fontFamily: "Whitney, sans-serif",
    h6: {
      fontSize: "1.50rem",
      fontWeight: "700",
      lineHeight: "normal",
    },
    body1:{
      fontSize: '1rem'
    },
    subtitle1:{
      fontSize:14,
    },
    fontSize:16
    
  },
});

export default customTheme;
