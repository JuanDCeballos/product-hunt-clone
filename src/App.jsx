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

        {/* Resto del contenido de la aplicación */}
      </div>
    </>
  );
};

export default App;
