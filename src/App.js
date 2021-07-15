import './styles/App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './routes/Routes'
import { Provider } from 'react-redux';
import { useStore } from './redux/store';

function App() {
  const store = useStore();
  return (
    <Provider store={store}>
      <Router>
        <Routes />
      </Router>
    </Provider>
  );
}

export default App;
