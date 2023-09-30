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
          <img src={phoneImg} alt="" style={{marginRight:'0.5rem'}} />
          <span>9845970484</span>
        </div>
        <div></div>
        <div></div>
      </div>
      <div className={styles.mainBody}></div>
      <div className={styles.footer}></div>
    </div>
  )
}

export default MainPage