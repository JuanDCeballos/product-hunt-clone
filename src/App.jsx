import { HomePageComponent } from "./Home/Components/HomePageComponent";
import { ProductListComponent } from "./Product/Components/ProductListComponent";
import Header from "./Home/Components/Header";
import ProductForm from "./Product/ProductForm";
import UserProfile from "./User/Components/UserProfile";

const App = () => {
  return (
    <>
      <div>
        <Header />
        <UserProfile />
        <ProductForm />
        <HomePageComponent />

        {/* Resto del contenido de la aplicación */}
      </div>
    </>
  );
};

export default App;
