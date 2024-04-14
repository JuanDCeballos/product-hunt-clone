import { SimpleProductView } from './SimpleProductView.jsx'
import { ProductTestInfos } from '../Helpers/exampleData.js'

export const ProductListComponent = ({ Title }) => {

    const ProductTestInfo = ProductTestInfos

    return (
        <>
            <div
                className="flex flex-col space-y-8 "
            >
                <h3 className='font-bold text-2xl'> {Title} </h3>
                <div className='space-y-4 w-3/4'>
                    <div className='flex flex-row space-x-6 '>
                        <h4 className='font-semibold text-red-400'> Featured </h4>
                        <h4 className='font-semibold'> | </h4>
                        <h4 className='font-semibold'> All </h4>
                    </div>

                    <hr className='w-3/5' />
                </div>

                <div className='flex flex-col space-y-8'>
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