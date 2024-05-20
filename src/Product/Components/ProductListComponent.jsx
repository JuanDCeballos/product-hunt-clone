import { useContext, useEffect, useState } from 'react';
import { SimpleProductView } from './SimpleProductView.jsx';
import { ProductContext } from '../Contexts/ProductContext.jsx';

export const ProductListComponent = ({ Title, productsList }) => {
  const { categories, platforms, productTypes } = useContext(ProductContext);

  const [originalList, setOriginalList] = useState(productsList);
  const [productsFiltered, setProductsFiltered] = useState([]);

  useEffect(() => {
    let filteredList = originalList;

    if (categories !== undefined && categories.length >= 1) {
      filteredList = filteredList.filter((product) =>
        categories.includes(product.Category)
      );
    }

    if (platforms !== undefined && platforms.length >= 1) {
      filteredList = filteredList.filter((product) =>
        platforms.includes(product.productPlatform)
      );
    }

    if (productTypes !== undefined && productTypes.length >= 1) {
      filteredList = filteredList.filter((product) =>
        productTypes.includes(product.softwareProductType)
      );
    }

    setProductsFiltered(filteredList);
  }, [categories, platforms, productTypes]);

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
          {productsFiltered !== undefined && productsFiltered.length >= 1 ? (
            <>
              {productsFiltered?.map((Product) => (
                <SimpleProductView key={Product.id} productInfo={Product} />
              ))}
            </>
          ) : (
            <>
              <div className="flex flex-col justify-center items-center mt-4">
                <p className="font-black text-2xl">
                  We don't have products with this filter!
                </p>
                <img src="NoProducts.svg" className="size-48" />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
