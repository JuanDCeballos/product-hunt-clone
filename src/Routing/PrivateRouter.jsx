import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { LogInContext } from '../Login/Context/LogInContext';

const PrivateRouter = ({ children }) => {
  const { user } = useContext(LogInContext);

  return user ? children : <Navigate to="/LogIn" />;
};

export default PrivateRouter;
