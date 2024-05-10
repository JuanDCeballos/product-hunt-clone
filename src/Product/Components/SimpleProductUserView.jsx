import { CiChat2 } from 'react-icons/ci';
import { GrEdit } from 'react-icons/gr';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdOutlineRestore } from 'react-icons/md';
import { useContext, useState } from 'react';
import {
  setProductInDisabled,
  setProductInEnabled,
} from '../../Firebase/Functions';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../Contexts';

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
  const { SetProductToEdit } = useContext(ProductContext);
  const navigate = useNavigate();
  const [isEnabled, setIsEnabled] = useState(enabled);

  const deleteProduct = () => {
    toast.promise(setProductInDisabled(productInfo.id), {
      loading: 'Deleting product...',
      error: 'An error ocurred while trying to delete product.',
      success: () => {
        setIsEnabled(false);
        return 'Product deleted successfully.';
      },
    });
  };

  const restoreProduct = () => {
    toast.promise(setProductInEnabled(productInfo.id), {
      loading: 'Restoring product...',
      error: 'An error ocurred while trying to restore product.',
      success: () => {
        setIsEnabled(true);
        return 'Product restored successfully.';
      },
    });
  };

  const updateProduct = () => {
    SetProductToEdit(productInfo);
    navigate('../SumbitProduct', { replace: true });
  };

  return (
    <>
      <a>
        <div className="flex flex-row justify-between space-x-4 ">
          <div className="flex flex-row space-x-6 items-center">
            <img className="size-16 rounded-lg" src={picture} />

            <div className="flex flex-col space-y-2 justify-start">
              <div className="flex space-x-2">
                <h4 className="font-semibold">
                  {productName} — {productShortDescription}
                </h4>
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
          {isEnabled ? (
            <>
              <button
                className="border-l border-indigo-100 px-6 size-16"
                onClick={deleteProduct}
              >
                <div className="flex flex-col items-center">
                  <AiOutlineDelete />
                </div>
              </button>
              <button
                className="border-l border-indigo-100 px-6 size-16"
                onClick={updateProduct}
              >
                <div className="flex flex-col items-center">
                  <GrEdit />
                </div>
              </button>
            </>
          ) : (
            <button
              className="border-l border-indigo-100 px-6 size-16"
              onClick={restoreProduct}
            >
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
