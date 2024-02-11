import './Home.css'; // Make sure to create a Home.css file for styles
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className="home">
      <h1>Plan a trip to experience Seoul like a local</h1>
      <div className="buttons">
        
        <Link className="login-btn" to="/login">Login</Link>
        <Link className="signup-btn"to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default Home;
