import React, {useState, useEffect} from 'react';
import styles from './MainPage.module.css';
import phoneImg from '../../Assets/phone.png';
import { useNavigate } from 'react-router-dom';
import gradient from '../../Assets/backgradient2.png';
import logoImg from '../../Assets/head.png';
import search from '../../Assets/search.png';
import grid from '../../Assets/grid.png';
import list from '../../Assets/list.png';
import axios from 'axios';

function MainPage() {
  const navigate =useNavigate()
  const [isLoggedIn, setIsLoggedIn]=useState(false);
  const [nameSearch, setNameSearch]=useState('');
  const [typeOption, setTypeOption] = useState('');
  const [companyOption, setCompanyOption] = useState('');
  const [colorOption, setColorOption] = useState('');
  const [priceOption, setPriceOption] = useState('');
  const [sortingOption, setSortingOption] = useState('');
  const [products, setProducts]=useState([]);

  useEffect(()=>{
    const User=localStorage.getItem('user');
    if(User){
      setIsLoggedIn(true);
    }
        
  }, []);

  const handleLogout=()=>{
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login');
  }
  const handleLogin=()=>{
    navigate('/login');
  }
  const handleSignup=()=>{
    navigate('/register')
  }

  const fetchProducts = async () => {
    let route = 'http://localhost:4000/get-prods';
    route += '?type=' + typeOption + '&company=' + companyOption + '&color=' + colorOption  + '&sort=' + sortingOption + '&name_of_product' + nameSearch;
    
    if (priceOption) {
      const priceRange = priceOption.split('-');
      const minPrice = priceRange[0].replace("₹", "");
      const maxPrice = priceRange[1].replace("₹", "");
      route += '&min_price=' + minPrice + '&max_price=' + maxPrice;
    }

    try {
      const response = await axios.get(route);
      const data = response.data;
      
      if(data.status === 'success'){
        setProducts(data.products);
        console.log(data.products);
        
      } else {
      }
    } catch (error) {
      console.log(error);
    }
}

  useEffect(() => {
    fetchProducts(); 
  }, [typeOption, companyOption, colorOption, priceOption, sortingOption]);
  
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
                <button className={styles.logoutbutton} onClick={handleLogout}>Logout</button>
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
          <div style={{width:'100%', display:'flex', justifyContent:'flex-start', marginTop:'2rem', alignItems:'center'}}>
            <img src={logoImg} alt="" height={40} style={{marginRight:'1rem'}} />
            <a href="/" style={{textDecoration:'none', color:'black'}}>Home</a>
          </div>

          <div style={{backgroundImage:`url(${gradient})`, backgroundRepeat:'no-repeat', backgroundPosition:'center', backgroundSize:'100%', height:'20rem', paddingLeft:'5rem', display:'flex', alignItems:'center'}}>
            <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
              <h1 style={{color:'#2E0052', width:'50%', textAlign:'start', fontWeight:'bolder', fontSize:'xxx-large'}}>Grab upto 50% off on Selected headphones</h1>
              <button className={styles.buyNow}>Buy Now</button>
            </div>
          </div>

          <div className={styles.searchBar}>
            <img src={search} alt="" height={30} />
            <input type="text" placeholder='Search Product' onChange={(e)=>{setNameSearch(e.target.value)}} />
          </div>

          <div className={styles.sortAndFilter}>
            <div className={styles.view}>
              <img src={grid} alt="" height={35} />
              <img src={list} alt="" height={40} />
            </div>
            <div className={styles.filters}>
               <select className={styles.headphoneType} value={typeOption} onChange={(e) => setTypeOption(e.target.value)}>
                  <option value="">Headphone type</option>
                  <option value="featured">Featured</option>
                  <option value="In-ear headphone">In-ear headphone</option>
                  <option value="On-ear headphone">On-ear headphone</option>
                  <option value="Over-ear headphone">Over-ear headphone</option>
                </select>
               <select className={styles.company} value={companyOption} onChange={(e) => setCompanyOption(e.target.value)}>
                  <option value="">Company</option>
                  <option value="Featured">Featured</option>
                  <option value="JBL">JBL</option>
                  <option value="Sony">Sony</option>
                  <option value="Boat">Boat</option>
                  <option value="Zebronics">Zebronics</option>
                  <option value="Marshall">Marshall</option>
                  <option value="Ptron">Ptron</option>
                </select>
               <select className={styles.color} value={colorOption} onChange={(e) => setColorOption(e.target.value)}>
                  <option value="">Color</option>
                  <option value="Featured">Featured</option>
                  <option value="Blue">Blue</option>
                  <option value="Black">Black</option>
                  <option value="White">White</option>
                  <option value="Brown">Brown</option>
                </select>
               <select className={styles.price} value={priceOption} onChange={(e) => setPriceOption(e.target.value)}>
                  <option value="">Price</option>
                  <option value="Featured">Featured</option>
                  <option value="₹0-₹1000">₹0-₹1000</option>
                  <option value="₹1000-₹10000">₹1000-₹10,000</option>
                  <option value="₹10000-₹20000">₹10,000-₹20,000</option>
                </select>
            </div>
            <div className={styles.sort}>
               <select className={styles.sorting} value={sortingOption} onChange={(e) => setSortingOption(e.target.value)}>
                  <option value="">Sort by : Featured</option>
                  <option value="Featured">Featured</option>
                  <option value="lowest">Price : Lowest</option>
                  <option value="highest">Price : Highest</option>
                  <option value="ascending">Name : (A-Z)</option>
                  <option value="descending">Name : (Z-A)</option>
                </select>
            </div>
          </div>
          <div className={styles.products}>
            {
              products&&products.map((product, idx)=>(
                <div className={styles.cardStyles} key={idx}>
                  <div className={styles.imgStyles}>
                    <img src={product.imageURLs[0]} alt="" height={180} width={150} />
                  </div>
                  <div className={styles.prodDesc}>
                    <span style={{fontWeight:'bold', marginBottom:'0.5rem'}}>{product.name_of_product}</span>
                    <span style={{fontWeight:500, marginBottom:'0.5rem'}}>Price - ₹{product.price}</span>
                    <span style={{fontWeight:500, marginBottom:'0.5rem'}}>{product.color}&nbsp;|&nbsp;{product.type}</span>
                  </div>
                  
                </div>
              ))
            }
          </div>

        </div>
      </div>
      <div className={styles.footer}></div>
    </div>
  )
}

export default MainPage