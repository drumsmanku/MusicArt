import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Register.module.css';
import img1 from '../../Assets/head.png';

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
    <div className='signup-container'>
      <div className="headings">
        <img src={img1}alt="" />
      </div>
      <form>
        <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
          
          <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Name"/>
        </div>

        <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
          
          <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email"/>
        </div>

        <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
          
          <input type="text" name="mobile" value={user.mobile} onChange={handleChange} placeholder="Mobile" />
        </div>

        <div style={{display:'flex', width:'100%', marginBottom:'2rem'}}>
          
          <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" />
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