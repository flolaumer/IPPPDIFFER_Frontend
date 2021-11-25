import './App.css';
import { Component } from 'react';
import Header from './components/layout/Header';
import Differ from './components/Differ';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Scroll from './components/Scroll';

let theme = createTheme({
  palette: {
    primary: {
      main: "#20607E"
    },
    secondary: {
      main: "#A8ADB3"
    },
    danger: {
      main: "#DA0C1F"
    },
    warning: {
      main: "#FF9B00"
    },
    success: {
      main: "#64A844"
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
        <header className="App-header">
         
 
          <ThemeProvider theme={theme}>
            <Header></Header>
            <Differ></Differ>
            <Scroll showBelow="250"></Scroll>
          </ThemeProvider>
        </header>
      </div>
    );
  }
}

export default App;
