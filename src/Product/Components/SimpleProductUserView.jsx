import {
  AiOutlineDelete,
  GrEdit,
  CiChat2,
  MdOutlineRestore,
} from 'react-icons/ci';
import Modal from './Modal.jsx';
import { useContext, useState } from 'react';
import { ProductContext } from '../Contexts/Context/ProductContext.jsx';

export const SimpleProductUserView = ({ productInfo }) => {
  const {
    picture,
    productName,
    productShortDescription,
    productPlatform,
    softwareProductType,
    productCategory,
    enabled,
  } = productInfo;

  const { SetProduct } = useContext(ProductContext);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    console.log(productInfo);
    SetProduct(productInfo);
    setIsOpen((prevState) => !prevState);
  };

  const closeModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <Modal isOpen={isOpen} closeModal={closeModal} />
      <a>
        <div
          className="flex flex-row justify-between space-x-4 "
          onClick={openModal}
        >
          <div className="flex flex-row space-x-6 items-center">
            <img className="size-16 rounded-lg" src={picture} />

            <div className="flex flex-col space-y-2 justify-start">
              <div className="flex space-x-2">
                <h4 className="font-semibold">
                  {productName} — {productShortDescription}
                </h4>
              </div>

              <div className="flex space-x-2 items-center">
                <CiChat2 />
                <h4 className="font-normal">{productPlatform}</h4>
                <h4 className="font-normal"> • </h4>
                <h4 className="font-normal">{softwareProductType}</h4>
                <h4 className="font-normal"> • </h4>
                <h4 className="font-normal">{productCategory}</h4>
              </div>
            </div>
          </div>
          {enabled ? (
            <>
              <button className="border-l border-indigo-100 px-6 size-16">
                <div className="flex flex-col items-center">
                  <AiOutlineDelete />
                </div>
              </button>
              <button className="border-l border-indigo-100 px-6 size-16">
                <div className="flex flex-col items-center">
                  <GrEdit />
                </div>
              </button>
            </>
          ) : (
            <button className="border-l border-indigo-100 px-6 size-16">
              <div className="flex flex-col items-center">
                <MdOutlineRestore />
              </div>
            </button>
          )}
        </div>
      </a>
    </>
  );
};
