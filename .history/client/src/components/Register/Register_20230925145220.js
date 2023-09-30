import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Register.module.css';
import img1 from '../../Assets/head.png';


const DivStyles={
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '1rem',
  alignItems: 'flex-start',
  width: '85%',
}
const InputStyles={
  width: '90%',
  padding:'0.5rem 0.5rem 0.5rem 0.5rem',
  borderRadius: '8px',
  border:'2px solid #B6B6B6',
  marginTop: '0.5rem',
}
function Register() {
  const navigate=useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    mobile: '',
    password: ''
  });
  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };
  const signup = (event) => {
    event.preventDefault();
    axios.post('http://localhost:4000/signup', user)
      .then(res => {
        localStorage.setItem('token', res.data.jwtToken);
        localStorage.setItem('user', res.data.name);
        const tokenData=localStorage.getItem('token')
        if(tokenData!=='undefined') {
          navigate('/')
        }
        
      })
      .catch(err => console.log(err));
  };
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <img src={img1}alt="" height={30} />
      </div>
      <form className={styles.form}>
        
        <div className={styles.inputContainer}>
          <h1 style={{alignSelf:'start', paddingLeft:'2.2rem', fontWeight:500}}>Create Account</h1>
          <div style={DivStyles}>
            <label htmlFor="name" style={{fontWeight:600, }}>Your Name</label>
            <input type="text" name="name" value={user.name} onChange={handleChange} style={InputStyles}/>
          </div>

          <div style={DivStyles}>
            <label htmlFor="mobile" style={{fontWeight:600}}>Mobile number</label>
            <input type="text" name="mobile" value={user.mobile} onChange={handleChange} style={InputStyles} />
          </div>

          <div style={DivStyles}>
            <label htmlFor="email" style={{fontWeight:600}}>Email</label>
            <input type="email" name="email" value={user.email} onChange={handleChange} style={InputStyles}/>
          </div>

          
          <div style={DivStyles}>
            <label htmlFor="password" style={{fontWeight:600}}>Password</label>
            <input type="password" name="password" value={user.password} onChange={handleChange} style={InputStyles} />
          </div>
        </div>
        <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
          <p style={{width:'85%', textAlign:'left', fontWeight:600, marginTop:0}}>By enrolling your mobile phone number, you consent to receive automated security notifications via text message from Musicart. Message and data rates may apply.
          </p>
        </div>
        
        <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
          <button className={styles.buttonStyles} type="submit" style={{ cursor:'pointer'}} onClick={signup}>Continue</button>
        </div>

        <div style={{width:'100%', display:'flex', justifyContent:'center', marginTop:'1rem'}}>
          <p style={{width:'85%', textAlign:'left',fontSize:'small',  marginTop:0}}>By continuing, you agree to Musicart privacy notice and conditions of use.
          </p>
        </div>

        <span style={{color:'#737373'}}>Already have an account?<button style={{background:'none', color:'#36416A', fontSize:'medium', marginLeft:0, padding:0, width:'4rem', cursor:'pointer', border:'none', textDecoration:'underline'}} onClick={()=>{navigate('/login')}}>Log In</button></span>
        
        

      </form>
    </div>
  )
}

export default Register