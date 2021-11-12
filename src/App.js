import './App.css';
import { Component } from 'react';
import Header from './components/layout/Header';
import Differ from './components/Differ';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Scroll from './components/Scroll';

const primaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--groupui-vwag-color-petrol-800-primary')
  .trim();
      
const secondaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--groupui-vwag-color-grey-400-secondary')
  .trim();

const dangerColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--groupui-vwag-color-signal-red-800-primary')
  .trim();

const warningColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--groupui-vwag-color-signal-orange-800-primary')
  .trim();

const successColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--groupui-vwag-color-signal-green-800-primary')
  .trim();

let theme = createTheme({
  palette: {
    primary: {
      main: primaryColor
    },
    secondary: {
      main: secondaryColor
    },
    danger: {
      main: dangerColor
    },
    warning: {
      main: warningColor
    },
    success: {
      main: successColor
    }
  },
});

theme = createTheme(theme, {
  palette: {
    info: {
      main: theme.palette.secondary.main,
    },
  },
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <Header></Header>
          <Differ></Differ>
          <Scroll showBelow="250"></Scroll>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
