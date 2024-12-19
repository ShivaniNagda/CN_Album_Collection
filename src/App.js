//styling
import './App.css';
//store
import { Provider } from 'react-redux';
import { store } from './redux/store';
//React toast
import { ToastContainer } from 'react-toastify';
//components
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Navbar/>
        <Home/>
        <ToastContainer autoClose="1500"/>
      </Provider>
    </div>
  );
}

export default App;
