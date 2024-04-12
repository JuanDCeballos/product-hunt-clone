import { CiChat2 } from "react-icons/ci";

export const SimpleProductView = ({ productInfo }) => {

    const { picture, productName, productShortDescription,
        ComentsCount, productPlatform, softwareProductType,
        productCategory, RatingCount } = productInfo;
    return (
        <>
            <div
                className="flex flex-row"

            >
                <img className="size-16" src={picture} />

                <div className="flex flex-col">

                    <div className="flex flex-row">
                        <h4 className="productNameText"> {productName} — {productShortDescription} </h4>
                    </div>

                    <div className="flex flex-row">
                        <CiChat2 />
                        <h4 className="secondLineProductText"> {ComentsCount} • {productPlatform} • {softwareProductType} • {productCategory} </h4>
                    </div>

                </div>

            </div>
        </>
    );
};