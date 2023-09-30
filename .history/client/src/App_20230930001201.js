import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import MainPage from './Components/MainPage/MainPage';
import ProductDetail from './Components/ProductDetail/ProductDetail';
import Cart from './Components/Cart/Cart';
import BuySingleItem from './Components/BuySingleItem/BuySingleItem';
import PlaceOrder from './Components/PlaceOrder/PlaceOrder';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/register' element={<Register/>}/>
         <Route path='/get-prod-det/:id' element={<ProductDetail/>}/>
         <Route path='/cart' element={<Cart/>}/>
         <Route path='/single-item' element={<BuySingleItem/>}/>
         <Route path='/place-order' element={<PlaceOrder/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
