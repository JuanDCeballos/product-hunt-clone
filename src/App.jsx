import { Header } from './Home/Components/Header';
import { UserProvider } from './Users/Contexts/Providers/UserProvider.jsx';
import { ProductProvider } from './Product/Contexts/Provider/ProductProvider.jsx';
import AppRouting from './Routing/AppRouter.jsx';

const App = () => {
  return (
    <>
      <UserProvider>
        <ProductProvider>
          <Header />
          <AppRouting />
        </ProductProvider>
      </UserProvider>
    </>
  );
};

export default App;
