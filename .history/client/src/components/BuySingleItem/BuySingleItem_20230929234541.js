import React from 'react';
import { useSelector } from 'react-redux';


function BuySingleItem() {
  const buyItem=useSelector((state)=>state.buy)
  return (
    <div>
      {
        buyItem&&(
          <div>{buyItem.price&& buyItem.price}</div>
        )
      }
    </div>
  )
}

export default BuySingleItem