import { useState } from 'react';
import Modal from './Product/Components/Modal';
import { HomePageComponent } from './Home/Components/HomePageComponent';
import Header from './Home/Components/Header';

const App = () => {

  return (
    <>
      <Header />
      <div>
        <HomePageComponent />
      </div>
    </>
  );
};

export default App;
