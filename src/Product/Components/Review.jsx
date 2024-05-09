import { useContext } from 'react';
import ReactStars from 'react-rating-stars-component';
import { ProductContext } from '../Contexts/Context/ProductContext';

export const Review = () => {
  const { product } = useContext(ProductContext);
  const { UserPhotoURL, UserName, Message, Rating, UserDescription } = product;
  console.log(product);

  return (
    <div>
      <div className="flex gap-2 items-center">
        <div>
          <img src={UserPhotoURL} className="rounded-full" />
        </div>
        <div>
          <div className="flex flex-row gap-2">
            <a className="text-base font-semibold" href="">
              {UserName}
            </a>
            <button className="text-xs text-orange-500">Follow</button>
          </div>
          <p className="text-sm">{UserDescription}</p>
        </div>
      </div>
      <div>
        <div>
          <ReactStars
            count={5}
            activeColor="#2563eb"
            size={24}
            value={Rating}
            edit={false}
          ></ReactStars>
        </div>
        <p className="text-lg italic font-normal text-slate-500">{Message}</p>
      </div>
      <hr className="mt-8" />
    </div>
  );
};
