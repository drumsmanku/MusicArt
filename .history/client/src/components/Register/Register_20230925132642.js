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
  width: '80%',
}
const InputStyles={
  width: '90%',
  padding:'0.5rem 0.5rem 0.5rem 0.5rem',
  borderRadius: '8px',
  border:'2px solid #B6B6B6',
  marginTop: '0.5rem'
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
        <img src={img1}alt="" />
      </div>
      <form className={styles.form}>
        
        <div className={styles.inputContainer}>
          <h2 style={{alignSelf:'start', paddingLeft:'2.5rem'}}>Create Account</h2>
          <div style={DivStyles}>
            <label htmlFor="name" style={{fontWeight:600}}>Name</label>
            <input type="text" name="name" value={user.name} onChange={handleChange} style={InputStyles}/>
          </div>

          <div style={DivStyles}>
            <label htmlFor="email" style={{fontWeight:600}}>Email</label>
            <input type="email" name="email" value={user.email} onChange={handleChange} style={InputStyles}/>
          </div>

          <div style={DivStyles}>
            <label htmlFor="mobile" style={{fontWeight:600}}>Mobile</label>
            <input type="text" name="mobile" value={user.mobile} onChange={handleChange} style={InputStyles} />
          </div>

          <div style={DivStyles}>
            <label htmlFor="password" style={{fontWeight:600}}>Password</label>
            <input type="password" name="password" value={user.password} onChange={handleChange} style={InputStyles} />
          </div>
        </div>
        

        <span style={{color:'#737373'}}>Already have an account?<button style={{background:'none', color:'#36416A', fontSize:'medium', marginLeft:0, padding:0, width:'4rem', cursor:'pointer', border:'none', textDecoration:'underline'}} onClick={()=>{navigate('/login')}}>Log In</button></span>
        
        <div style={{width:'85%', textAlign:'end'}}>
          <button className='signup-button' type="submit" style={{ cursor:'pointer'}} onClick={signup}>Sign up</button>
        </div>

      </form>
    </div>
  )
}

export default Register