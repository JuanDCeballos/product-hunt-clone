import { HomePageComponent } from './Home/Components/HomePageComponent';
import { Header } from './Home/Components/Header';
import { Outlet, Route, Routes } from 'react-router-dom';
import { ProductForm } from './Product/Components/ProductForm';
import { UserProfile } from './User/Components/UserProfile.jsx';

const App = () => {

  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<HomePageComponent />} />
        <Route path='SumbitProduct' element={<ProductForm />} />
        <Route path='UserProfile' element={<UserProfile />} />
      </Routes>

    </>
  );
};

export default App;
