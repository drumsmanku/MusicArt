import React, {useState, useEffect} from 'react';
import styles from './Cart.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import phoneImg from '../../Assets/phone.png';

function Cart() {

  const [isLoggedIn, setIsLoggedIn]=useState(false);

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
  const cartItems = useSelector((state) => state.cart);

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
        {
          cartItems.length>0?(cartItems.map((item, idx)=>(
            <div key={idx}>{item.name_of_product}</div>
          ))
            
          ):
          (
            <span>nothing to see here</span>
          )
        }
      </div>

      <div className={styles.footer}>

      </div>
      
    </div>
  )
}

export default Cart