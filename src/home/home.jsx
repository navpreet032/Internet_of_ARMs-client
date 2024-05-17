import './Home.css'; 
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className="home">
      <h1>Internet Of ARMs</h1>
      <div className="buttons">
        
        <Link className="login-btn" to="/login">Login</Link>
        <Link className="signup-btn"to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default Home;
