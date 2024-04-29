import { useContext } from 'react';
import { UserContext } from '../Users/Contexts/Context/UserContext';
import { Navigate } from 'react-router-dom';

const PublicRouter = ({ children }) => {
  const { User: Logged } = useContext(UserContext);

  return !Logged ? children : <Navigate to="/UserProfile" />;
};

export default PublicRouter;
