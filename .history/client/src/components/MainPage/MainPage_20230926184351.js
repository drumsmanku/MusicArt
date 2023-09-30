import React, {useState, useEffect} from 'react';
import styles from './MainPage.module.css';
import phoneImg from '../../Assets/phone.png';

function MainPage() {

  const [isLoggedIn, setIsLoggedIn]=useState(false);


  useEffect(()=>{
    const User=localStorage.getItem('user');
    if(User){
      setIsLoggedIn(true);
    }
        
  }, []);
  
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
                <button className={styles.logoutbutton}>Logout</button>
              </>
            ):
            <>
             <button>Login</button>&nbsp | &nbsp
             <button>Sign Up</button>
            </>
          }
        </div>
      </div>
      <div className={styles.mainBody}></div>
      <div className={styles.footer}></div>
    </div>
  )
}

export default MainPage