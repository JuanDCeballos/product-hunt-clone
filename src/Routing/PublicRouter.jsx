import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { LogInContext } from '../Login/Context/LogInContext';

const PublicRouter = ({ children }) => {
  const { user } = useContext(LogInContext);

  return !user ? children : <Navigate to="/UserProfile" />;
};

export default PublicRouter;
