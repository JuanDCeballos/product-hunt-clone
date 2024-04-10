import { useState } from 'react';
import Modal from './Product/Modal';

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
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
      <p>This is a test</p>
      <button onClick={openModal}>Open</button>
      <Modal isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};

export default App;
