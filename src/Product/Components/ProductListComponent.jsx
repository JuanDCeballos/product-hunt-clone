import { SimpleProductView } from './SimpleProductView.jsx';
import { getProducts } from '../../Firebase/Functions';
import { useEffect, useState } from 'react';

export const ProductListComponent = ({ Title }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((products) => {
      setProducts(products);
    });
  }, []);

  return (
    <>
      <div className="flex flex-col space-y-8 ">
        <h3 className="font-bold text-2xl"> {Title} </h3>
        <div className="space-y-4 w-3/4">
          <div className="flex flex-row space-x-6 ">
            <h4 className="font-semibold text-red-400"> Featured </h4>
            <h4 className="font-semibold"> | </h4>
            <h4 className="font-semibold"> All </h4>
          </div>

          <hr className="w-3/5" />
        </div>

        <div className="flex flex-col space-y-8">
          {products.map((Product) => (
            <SimpleProductView key={Product.id} productInfo={Product} />
          ))}
        </div>
      </div>
    </>
  );
};
