import React, { useEffect, useState } from 'react';
import './login.css'; // Make sure to create a Signup.css file for styles
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../authcontext/authcontext';



const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState('email');
  const [button_lable, setButton_lable] = useState('Continue')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async(event) => {
    event.preventDefault();
    if (step === 'email') {
      // Validate the email then move to password step
      
      setStep('password');
      setButton_lable('Login')
    } else {
        
        console.log('Login with:', { email, password });
      try {
        
        const response = await axios.post('/api/user/login',{
            email, password
        },{
          withCredentials: true //  for handling sessions/cookies
        });
        await auth.checkUser()
        console.log('Login successful:', response.data);
        
        navigate("/viewport")
      } catch (error) {
        console.log(error)
        setButton_lable(error.response.data)
      }
    }
  };
 

  return (
    <div className="login">
      <div className="logo">
        {/* Placeholder for logo */}
      </div>
      <h2>Welcome Back</h2>
      <form onSubmit={handleSubmit}>
        {step === 'email' && (
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
          />
        )}
        {step === 'password' && (
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        )}
        
        <button type="submit">{button_lable}</button>
      </form>
      <p>Don't have an account? <a href="/signup">SignUp</a></p>
    </div>
  );
};

export default Login;
