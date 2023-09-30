import React from 'react';
import styles from './Cart.module.css'
import { useSelector } from 'react-redux';

function Cart() {

  const cartItems = useSelector((state) => state.cart);
  return (
    <div>Cart</div>
  )
}

export default Cart