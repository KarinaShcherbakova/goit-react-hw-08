import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';
import App from './App';
import './index.css';
import { createTheme, ThemeProvider } from '@mui/material/styles'; 


const theme = createTheme({
  palette: {
    primary: {
      main: '#7b1fa2',
    },
    secondary: {
      main: '#9c4dcc', 
    },
    background: {
      default: '#f3e5f5', 
    },
    text: {
      primary: '#4a148c', 
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);
