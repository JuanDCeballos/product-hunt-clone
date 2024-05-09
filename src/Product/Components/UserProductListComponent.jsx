import { SimpleProductUserView } from './SimpleProductUserView.jsx';
import { getProductsCreatedByUserUID } from '../../Firebase/Functions';
import { useContext, useEffect, useState } from 'react';
import { LogInContext } from '../../Login/Context';

export const UserProductListComponent = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(LogInContext);

  useEffect(() => {
    getProductsCreatedByUserUID(user.uid).then((result) => {
      setProducts(result.products);
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

        <div className="flex flex-col space-y-8">
          {products.map((Product) => (
            <SimpleProductUserView key={Product.id} productInfo={Product} />
          ))}
        </div>
      </div>
    </>
  );
};
