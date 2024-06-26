import { HomePageComponent } from '../Home/Components/HomePageComponent.jsx';
import { ProductForm } from '../Product/Components/ProductForm';
import { UserProfile } from '../Users/Components/UserProfile.jsx';
import { LogInComponent } from '../Login/Components/LogInComponent.jsx';
import UnderContrusction from '../ShareUI/Components/UnderConstruction.jsx';
import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRouter from './PrivateRouter.jsx';
import PublicRouter from './PublicRouter.jsx';
import { UserListComponent } from '../Users/Components';

const AppRouting = () => {
  return (
    <Routes>
      <Route path="*" element={<HomePageComponent />} />
      <Route
        path="SumbitProduct"
        element={
          <PrivateRouter>
            <ProductForm />
          </PrivateRouter>
        }
      />

      <Route
        path="UserProfile"
        element={
          <PrivateRouter>
            <UserProfile />
          </PrivateRouter>
        }
      />
      <Route
        path="LogIn"
        element={
          <PublicRouter>
            <LogInComponent />
          </PublicRouter>
        }
      />

      <Route
        path="Community"
        element={
          <PrivateRouter>
            <UserListComponent />
          </PrivateRouter>
        }
      />
      <Route path="UnderConstruction" element={<UnderContrusction />} />
    </Routes>
  );
};

export default AppRouting;
