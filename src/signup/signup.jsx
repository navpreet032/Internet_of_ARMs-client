import React, { useState } from 'react';
import './Signup.css'; // Make sure to create a Signup.css file for styles
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('email');
  const [button_lable, setButton_lable] = useState('Continue')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (step === 'email') {
      // Validate the email then move to password step
      setStep('password');
      setButton_lable('SignUp')
    } else {
      console.log('Signup with:', { email, password });
      try {
        const res = await axios.post('/api/user/signup', {
          email, password
        })
        console.log(res.data)
        navigate('/login');
      } catch (error) {
        console.log("SignUp Error: ", error.response)
      }

    }
  };

  return (
    <div className="signup">
      <div className="logo">
        {/* Placeholder for logo */}
      </div>
      <h2>Create your account</h2>
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
      <p>Already have an account? <a href="/login">Log in</a></p>
    </div>
  );
};

export default Signup;
