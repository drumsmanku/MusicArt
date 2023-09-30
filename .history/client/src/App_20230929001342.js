import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import MainPage from './Components/MainPage/MainPage';
import ProductDetail from './Components/ProductDetail/ProductDetail';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
         <Route path='/login/' element={<Login/>}/>
         <Route path='/register' element={<Register/>}/>
         <Route path='/get-prod-det/:id' element={<ProductDetail/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
