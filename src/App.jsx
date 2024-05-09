import { Toaster } from 'sonner';
import { Header } from './Home/Components/Header';
import { LogInProvider } from './Login/Context/LogInProvider.jsx';
import { ProductProvider } from './Product/Contexts/Provider/ProductProvider.jsx';
import AppRouting from './Routing/AppRouter.jsx';

const App = () => {
  return (
    <>
      <Toaster richColors />
      <LogInProvider>
        <ProductProvider>
          <Header />
          <AppRouting />
        </ProductProvider>
      </LogInProvider>
    </>
  );
};

export default App;
