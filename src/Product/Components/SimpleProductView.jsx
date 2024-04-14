import { CiChat2, CiSquareChevUp } from "react-icons/ci";
import Modal from './Modal.jsx'
import { useState } from "react";

export const SimpleProductView = ({ productInfo }) => {

    const { picture, productName, productShortDescription,
        ComentsCount, productPlatform, softwareProductType,
        productCategory, RatingCount } = productInfo;

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen((prevState) => !prevState);
    };

    const closeModal = () => {
        setIsOpen((prevState) => !prevState);
    };


    return (
        <>
            <Modal isOpen={isOpen} closeModal={closeModal} />
            <a>
                <div className="flex flex-row justify-between space-x-4 " onClick={openModal}>
                    <div
                        className="flex flex-row space-x-6 items-center"
                    >
                        <img className="size-16 rounded-lg" src={picture} />

                        <div className="flex flex-col space-y-2 justify-start">

                            <div className="flex space-x-2">
                                <h4 className="font-semibold">{productName} —  {productShortDescription}</h4>
                            </div>

                            <div className="flex space-x-2 items-center">

                                <CiChat2 />
                                <h4 className="font-normal"> {ComentsCount}</h4>
                                <h4 className="font-normal"> • </h4>
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
                            {RatingCount}
                        </div>
                    </button>
                </div >
            </a >
        </>
    );
};