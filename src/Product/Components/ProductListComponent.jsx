import { SimpleProductView } from './SimpleProductView.jsx'
import { ProductTestInfos } from '../Helpers/exampleData.js'

export const ProductListComponent = () => {

    const ProductTestInfo = ProductTestInfos

    return (
        <>
            <div
                className="MainDiv"
            >
                <h3> Top Products Launching Today </h3>
                <br />

                <div className='flex flex-col space-y-4'>

                    {
                        ProductTestInfo.map(Product => (
                            < SimpleProductView

                                key={Product.productName}
                                productInfo={Product}
                            />
                        ))
                    }
                </div>
            </div >
        </>
    );
};