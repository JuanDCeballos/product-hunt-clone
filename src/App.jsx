import { HomePageComponent } from './Home/Components/HomePageComponent';
import { Header } from './Home/Components/Header';
import { Route, Routes } from 'react-router-dom';
import { ProductForm } from './Product/Components/ProductForm';
import { UserProfile } from './Users/Components/UserProfile.jsx';
import { UserProvider } from './Users/Contexts/Providers/UserProvider.jsx'

const App = () => {

  return (
    <>
      <UserProvider>
        <Header />

        <Routes>
          <Route path='*' element={<HomePageComponent />} />
          <Route path='SumbitProduct' element={<ProductForm />} />
          <Route path='UserProfile' element={<UserProfile />} />
        </Routes>
      </UserProvider>

    </>
  );
};

export default App;
