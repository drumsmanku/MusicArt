import React from 'react';
import styles from './Success.module.css';
import logoImg from '../../Assets/head.png';

function Success() {
  return (
    <div className={styles.container}>
      <div style={{display:'flex', alignItems:'center', width:'90%'}}>
         <img src={logoImg} alt="" height={40} style={{marginRight:'1rem'}} />
         <a href="/" style={{textDecoration:'none', color:'black'}}>Home/ View Cart</a>
      </div>
    </div>
  )
}

export default Success