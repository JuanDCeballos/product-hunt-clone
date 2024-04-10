import Modal from 'react-modal';

Modal.setAppElement(document.getElementById('root'));

const ProductView = ({ isOpen, closeModal }) => {
  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={closeModal}>
        <p>This is a test</p>
      </Modal>
    </>
  );
};

export default ProductView;
