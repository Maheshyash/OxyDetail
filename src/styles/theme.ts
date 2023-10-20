import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#C66965',
      dark: '#df5959' //table header
    },
    grey: {
      50: '#dedede'
    },
    error: {
      light: '#FFCDD2',
      main: '#F44336',
      dark: '#D32F2F'
    },
    success: {
      light: '#C8E6C9',
      main: '#4CAF50',
      dark: '#388E3C'
    },
    divider: '#dedede',
    background: {
      default: '#f3f6f8'
    },
    text: {
      // primary: "#000000d9",
      primary: '#534f5a',
      secondary: '#00000094',
      disabled: '#00000061'
    }
  },

  typography: {
    fontFamily: 'Whitney, sans-serif',
    h6: {
      fontSize: '1.50rem',
      fontWeight: '700',
      lineHeight: 'normal'
    },
    body1: {
      fontSize: '1rem'
    },
    subtitle1: {
      fontSize: 14
    },
    fontSize: 12
  }
});

export default customTheme;
