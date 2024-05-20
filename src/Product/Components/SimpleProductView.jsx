import { CiSquareChevUp } from 'react-icons/ci';
import Modal from './Modal.jsx';
import { useContext, useState } from 'react';
import { ProductContext } from '../Contexts';
import { toast } from 'sonner';
import { getProductDataToShowInModal } from '../../Firebase/Functions';
import { FaUserFriends } from 'react-icons/fa';

export const SimpleProductView = ({ productInfo }) => {
  const {
    picture,
    productName,
    productShortDescription,
    productPlatform,
    softwareProductType,
    productCategory,
    commentsCount,
    isMadeByAFollwedUser,
  } = productInfo;

  const { SetProductToShowInModal, deleteProdutToShowInModal } =
    useContext(ProductContext);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = async () => {
    toast.promise(getProductDataToShowInModal(productInfo.id), {
      loading: 'Getting comments...',
      error: 'An error ocurred while trying product comments.',
      success: (data) => {
        const productWithComments = {
          ...productInfo,
          comments: data.comments,
          averageRating: data.averageRating,
        };
        SetProductToShowInModal(productWithComments);
        setIsOpen((prevState) => !prevState);
        return 'Comments obainted successfully!';
      },
    });
  };

  const closeModal = () => {
    deleteProdutToShowInModal();
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <Modal isOpen={isOpen} closeModal={closeModal} />
      <a>
        <div
          className="flex flex-row rounded-xl justify-between space-x-4 cursor-pointer hover:bg-gradient-to-l from-orange-100 from-35% to-white to-65%"
          onClick={openModal}
        >
          <div className="flex flex-row space-x-6 items-center ">
            <img className="size-16 rounded-md" src={picture} />

            <div className="flex flex-col space-y-2 justify-start">
              <div className="flex flex-row space-x-2 justify-center items-center">
                <h4 className="font-semibold">
                  {productName} — {productShortDescription} -{' '}
                </h4>
                {isMadeByAFollwedUser ? (
                  <FaUserFriends className="text-xl" />
                ) : (
                  <></>
                )}
              </div>
              <div className="flex space-x-2 items-center">
                <h4 className="font-normal">{productPlatform}</h4>
                <h4 className="font-normal"> • </h4>
                <h4 className="font-normal">{softwareProductType}</h4>
                <h4 className="font-normal"> • </h4>
                <h4 className="font-normal">{productCategory}</h4>
              </div>
            </div>
          </div>

          <button className="border-l border-indigo-100 px-6 size-16">
            <div className="flex flex-col items-center">
              <CiSquareChevUp />
              {commentsCount}
            </div>
          </button>
        </div>
      </a>
    </>
  );
};
