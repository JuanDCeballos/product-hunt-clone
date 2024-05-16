import { useContext, useEffect, useState } from 'react';
import { ProductListComponent } from '../../Product/Components/ProductListComponent';
import { toast } from 'sonner';
import { getProducts } from '../../Firebase/Functions';
import { LogInContext } from '../../Login/Context/LogInContext';
import { ProductContext } from '../../Product/Contexts';

export const ProductsFeedComponent = () => {
  const { isGettingData, setIsGettingDataTrue, setIsGettingDataFalse } =
    useContext(ProductContext);

  const { user } = useContext(LogInContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setIsGettingDataTrue();
    toast.promise(getProducts(user?.uid, user?.provider), {
      loading: 'Getting products...',
      error: 'An error ocurred while trying to get products',
      success: (products) => {
        setProducts(products);
        setIsGettingDataFalse();
        return 'Products loaded successfully!';
      },
    });
  }, []);

  return (
    <>
      {products && isGettingData === false ? (
        <>
          <ProductListComponent
            Title="Top Products Launching Today"
            productsList={products}
          />
          <ProductListComponent
            Title="Yesterday's Top Products"
            productsList={products}
          />
          <ProductListComponent
            Title="Last Week's Top Products"
            productsList={products}
          />
          <ProductListComponent
            Title="Last Month's Top Products"
            productsList={products}
          />
        </>
      ) : isGettingData ? (
        <div className="flex flex-col justify-center items-center mt-4 animation">
          <p className="font-black text-2xl animate-pulse">
            We are getting our products, please wait!
          </p>
          <img src="GettingProducts.svg" className="size-48" />
        </div>
      ) : (
        <> </>
      )}
    </>
  );
};
