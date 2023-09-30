import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


function ProductDetail() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [productDet, setProductDet]=useState([]);
  const navigate=useNavigate();
  const{id}=useParams();

  useEffect(()=>{
    axios.get(`http://localhost:4000/get-prod-desc/${id}`)
         .then(res=>{setProductDet(res.data.product); console.log(res.data.product)})
         .catch(err=>console.log(err))
  },[id]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <div>ProductDetail</div>
  )
}

export default ProductDetail