import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './ProductDetail.module.css';
import phoneImg from '../../Assets/phone.png';
import cart from '../../Assets/cart.png';
import logoImg from '../../Assets/head.png';

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

  const handleLogout=()=>{
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    
  }
  const handleLogin=()=>{
    navigate('/login');
  }
  const handleSignup=()=>{
    navigate('/register')
  }
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
                <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
              </>
            ):
            <>
             <button className={styles.loginButton} onClick={handleLogin}>Login </button>&nbsp;|&nbsp;
             <button className={styles.signupButton} onClick={handleSignup}>Signup</button>
            </>
          }
        </div>
      </div>

      <div className={styles.mainBody}>
        <div className={styles.bodyContent}>
          <div style={{width:'100%', display:'flex', justifyContent:'space-between', marginTop:'2rem', alignItems:'center'}}>
              <div style={{display:'flex', alignItems:'center'}}>
                <img src={logoImg} alt="" height={40} style={{marginRight:'1rem'}} />
                <span style={{textDecoration:'none', color:'black'}}>Home/&nbsp;{productDet.name_of_product}</span>
              </div>
              {
                isLoggedIn&&(
                  <button className={styles.cartButton}><img src={cart} alt="" height={20}/>Show cart</button>
                )
              }
              
          </div>
          <button className={styles.backToProducts}>Back to products</button>
          
          {
            productDet&&(
              <div className={styles.productInfo}>
                <h2 style={{flexWrap:'wrap', textAlign:'start'}}>{productDet.short_desc}</h2>
                <div className={styles.otherDetails}>
                  <div className={styles.imagesDiv}>
                    <img src={productDet.imageURLs[0]} alt="" height={300}width={250}/>
                    <div className={styles.otherViewImages}>
                     
                    </div>
                  </div>
                  <div className={styles.otherDetailsDiv}>

                  </div>
                </div>
              </div>
            )
          }
        </div>
        
        
      </div>
    </div>
  )
}

export default ProductDetail