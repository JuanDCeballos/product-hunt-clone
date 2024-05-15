import { SimpleProductUserView } from './SimpleProductUserView.jsx';
import { getProductsCreatedByUserUID } from '../../Firebase/Functions';
import { useContext, useEffect, useState } from 'react';
import { LogInContext } from '../../Login/Context';

export const UserProductListComponent = () => {
  const [products, setProducts] = useState([]);
  const [isGettingData, setIsGettingData] = useState(true);
  const { user } = useContext(LogInContext);

  useEffect(() => {
    getProductsCreatedByUserUID(user.uid).then((result) => {
      setProducts(result.products);
      setIsGettingData(false);
    });
  }, []);

  return (
    <>
      <div className="flex flex-col space-y-8 mt-10">
        <div className="space-y-4 w-3/4">
          <div className="flex flex-row space-x-6 ">
            <h4 className="font-semibold"> Products </h4>
          </div>

          <div className="border-b border-indigo-100 px-6"></div>
        </div>

        {products & (products.length > 0) ? (
          <>
            <div className="flex flex-col space-y-8">
              {products.map((Product) => (
                <SimpleProductUserView key={Product.id} productInfo={Product} />
              ))}
            </div>
          </>
        ) : !isGettingData ? (
          <>
            <div className="flex flex-col justify-center items-center mt-4">
              <p className="font-black text-2xl">
                You don't have products yet, sumbit one!
              </p>
              <img src="NoProducts.svg" className="size-48" />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
