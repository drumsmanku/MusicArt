import React, {useState, useEffect} from 'react';
import styles from './MainPage.module.css';
import phoneImg from '../../Assets/phone.png';
import { useNavigate } from 'react-router-dom';
import gradient from '../../Assets/backgradient2.png';
import logoImg from '../../Assets/head.png';
import search from '../../Assets/search.png';
import grid from '../../Assets/grid.png';
import list from '../../Assets/list.png';

function MainPage() {
  const navigate =useNavigate()
  const [isLoggedIn, setIsLoggedIn]=useState(false);


  useEffect(()=>{
    const User=localStorage.getItem('user');
    if(User){
      setIsLoggedIn(true);
    }
        
  }, []);

  const handleLogout=()=>{
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login');
  }
  const handleLogin=()=>{
    navigate('/login');
  }
  const handleSignup=()=>{
    navigate('/register')
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
                <button className={styles.logoutbutton} onClick={handleLogout}>Logout</button>
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
          <div style={{width:'100%', display:'flex', justifyContent:'flex-start', marginTop:'2rem', alignItems:'center'}}>
            <img src={logoImg} alt="" height={40} style={{marginRight:'1rem'}} />
            <a href="/" style={{textDecoration:'none', color:'black'}}>Home</a>
          </div>

          <div style={{backgroundImage:`url(${gradient})`, backgroundRepeat:'no-repeat', backgroundPosition:'center', backgroundSize:'100%', height:'20rem', paddingLeft:'5rem', display:'flex', alignItems:'center'}}>
            <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
              <h1 style={{color:'#2E0052', width:'50%', textAlign:'start', fontWeight:'bolder', fontSize:'xxx-large'}}>Grab upto 50% off on Selected headphones</h1>
              <button className={styles.buyNow}>Buy Now</button>
            </div>
          </div>

          <div className={styles.searchBar}>
            <img src={search} alt="" height={30} />
            <input type="text" placeholder='Search Product' />
          </div>

          <div className={styles.sortAndFilter}>
            <div className={styles.view}>
              <img src={grid} alt="" height={35} />
              <img src={list} alt="" />
            </div>
            <div className={styles.filters}></div>
            <div className={styles.sort}></div>
          </div>
        </div>
      </div>
      <div className={styles.footer}></div>
    </div>
  )
}

export default MainPage