import React, {useState, useEffect, useCallback} from 'react';
import styles from './PlaceOrder.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import phoneImg from '../../Assets/phone.png';
import logoImg from '../../Assets/head.png';
import cart from '../../Assets/cart.png';
import shopping from '../../Assets/shopping_bag.png'
function PlaceOrder() {
  const cartItems = useSelector((state) => state.cart);

  const [isLoggedIn, setIsLoggedIn]=useState(false);
  const [quantities, setQuantities] = useState(() => {
    const initQuant = {};
    cartItems.forEach(item => initQuant[item.id] = 1)
    return initQuant;
  });

  const navigate =useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
    const User=localStorage.getItem('user');
    if(User){
      setIsLoggedIn(true);
    }
        
  }, []);

  const handleLogout=()=>{
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    
  }
  const handleLogin=()=>{
    navigate('/login');
  }
  const handleSignup=()=>{
    navigate('/register')
  }
  const setQuantity = useCallback((id, value) => {
    setQuantities(prevState => ({...prevState, [id]: value}));
  }, [setQuantities]);

  const handleQuantityChange = (e, id) => {
    const value = parseInt(e.target.value);  
    setQuantities(prevQuantities => ({ 
      ...prevQuantities,
      [id]: value
    }));
  };
  const calculateTotalPrice = () => {
    let total = 0;
    for (const item of cartItems) {
      total += (item.price * (quantities[item._id] || 1));
    }
    return total;
   }

  const calculateTotalPriceForItem = (price, id) => {
    return price * (quantities[id] || 1);
   }
  const handleTotalPrice = (price, itemId) => {
    return price * (quantities[itemId] || 1);
}
  

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div style={{display:'flex', alignItems:'center', fontSize:'small'}}>
          <img src={phoneImg} height={20} alt="" style={{marginRight:'0.5rem'}} />
          <span>9845970484</span>
        </div>

        <div style={{fontSize:'small'}}>
          <span>Get 50% off on selected items&nbsp;&nbsp; |  &nbsp;&nbsp;Shop Now</span>
        </div>

        <div>
          {
            isLoggedIn?(
              <>
                <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
              </>
            ):
            <>
             <button className={styles.loginButton} onClick={handleLogin}>Login </button>&nbsp;|&nbsp;
             <button className={styles.signupButton} onClick={handleSignup}>Signup</button>
            </>
          }
        </div>
      </div>

      <div className={styles.mainBody}>
        <div className={styles.bodyContent}>
          <div style={{width:'100%', display:'flex', justifyContent:'space-between', marginTop:'2rem', alignItems:'center'}}>
            <div style={{display:'flex', alignItems:'center'}}>
              <img src={logoImg} alt="" height={40} style={{marginRight:'1rem'}} />
              <a href="/" style={{textDecoration:'none', color:'black'}}>Home/ View Cart</a>
            </div>
            {
              isLoggedIn&&(
                <button className={styles.cartButton}  onClick={()=>{navigate('/cart')}}><img src={cart} alt="" height={20}/>{cartItems.length>0?cartItems.length:'Show cart'}</button>
              )
            }
            
            
          </div>
          <button className={styles.backToProducts} onClick={()=>{navigate('/')}}>Back to products</button>
          <div style={{width:'100%', display:'flex', justifyContent:'center', marginTop:'2rem', marginBottom:'4rem'}}>
            <span style={{display:'flex', alignItems:'center'}}><h2 style={{marginBottom:'0.5rem',textDecoration:'underline', fontWeight:'500' }}>Checkout</h2></span>
          </div>

          
        </div>
        
      </div>

      <div className={styles.footer}>
        <footer style={{ backgroundColor:'#2E0052', width:'100%', padding:'0.8rem 0 0.8rem 0', color:'white'}}>
          Musicart | All rights reserved
        </footer>
      </div>
      
    </div>
  )
}

export default PlaceOrder