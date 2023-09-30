import React from 'react';
import { useSelector } from 'react-redux';


function BuySingleItem() {
  const buyItem=useSelector((state)=>state.buy)
  return (
    <div>
      {
        buyItem&&(
          <div>{buyItem.name_of_product}</div>
        )
      }
    </div>
  )
}

export default BuySingleItem