import ReactStars from 'react-rating-stars-component';

export const Review = ({ comment }) => {
  const { UserPhotoURL, UserName, Message, Rating, UserDescription } = comment;

  return (
    <div>
      <div className="flex gap-2 items-center">
        <div>
          <img
            src={UserPhotoURL ? UserPhotoURL : 'defaultAvatar.svg'}
            className="w-10 h-10 rounded-full m-4"
          />
        </div>
        <div>
          <div className="flex flex-row gap-2">
            <a className="text-base font-semibold">{UserName}</a>
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
            isHalf={true}
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
