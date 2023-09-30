import React from 'react';
import styles from './Cart.module.css'
import { useSelector } from 'react-redux';

function Cart() {

  const cartItems = useSelector((state) => state.cart);
  return (
    <div>
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
  )
}

export default Cart