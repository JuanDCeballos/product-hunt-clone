import { useState } from 'react';
import Modal from './Product/Modal';
import { HomePageComponent } from './Home/Components/HomePageComponent';
import { ProductListComponent } from './Product/Components/ProductListComponent';
import Header from './Home/Components/Header';
import ProductForm from './Product/ProductForm';
import UserProfile from './User/Components/UserProfile';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  const closeModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <div>
        <h1 className='text-3xl font-bold underline'>Hello world!</h1>
        <p>This is a test</p>
        <button onClick={openModal}>Open</button>
        <Modal isOpen={isOpen} closeModal={closeModal} />

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
