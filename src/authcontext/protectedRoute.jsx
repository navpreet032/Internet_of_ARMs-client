import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './authcontext';

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !user) { // Check if not loading and user is null
      navigate('/login', { replace: true, state: { from: location } });
    }
  }, [user, isLoading, navigate, location]);

  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return user ? children : null;
};

export default ProtectedRoute;
