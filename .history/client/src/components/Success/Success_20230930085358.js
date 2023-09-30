import React from 'react';
import styles from './Success.module.css';
import logoImg from '../../Assets/head.png';

function Success() {
  return (
    <div className={styles.container}>
      <div style={{display:'flex', alignItems:'center', marginTop:'2rem', marginLeft:'4rem'}}>
         <img src={logoImg} alt="" height={40} style={{marginRight:'1rem'}} />
         <a href="/" style={{textDecoration:'none', color:'black'}}>Home/ View Cart</a>
      </div>

      <div className={styles.successMessage}>

      </div>
      <div className={styles.footer}>
        <footer style={{ backgroundColor:'#2E0052', width:'100%', padding:'0.8rem 0 0.8rem 0', color:'white'}}>
          Musicart | All rights reserved
        </footer>
      </div>
    </div>
  )
}

export default Success