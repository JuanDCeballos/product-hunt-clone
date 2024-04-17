import { useState } from "react"
import { ProductContext } from '../Context/ProductContext.jsx'

export const ProductProvider = ({ children }) => {

    const [product, SetProduct] = useState({});

    return (
        <>
            <ProductContext.Provider value={{ product, SetProduct }} >
                {children}
            </ProductContext.Provider >
        </>
    );
};