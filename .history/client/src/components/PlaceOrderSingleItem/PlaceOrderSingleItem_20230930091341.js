import React, {useState, useEffect, useCallback} from 'react';
import styles from './PlaceOrderSingleItem.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { clearCart } from '../../features/cart/cartSlice';
import phoneImg from '../../Assets/phone.png';
import logoImg from '../../Assets/head.png';
import cart from '../../Assets/cart.png';
import shopping from '../../Assets/shopping_bag.png'

function PlaceOrderSingleItem() {
  return (
    <div>PlaceOrderSingleItem</div>
  )
}

export default PlaceOrderSingleItem