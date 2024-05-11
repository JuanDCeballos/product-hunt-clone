export const SimpleUserProfileView = ({ user }) => {
  return (
    <>
      <div className="flex gap-2 items-center">
        <div>
          <img
            src={user?.UserPhotoURL ? user?.UserPhotoURL : 'defaultAvatar.svg'}
            className="size-20 rounded-full m-4"
          />
        </div>
        <div>
          <div className="flex flex-row gap-2">
            <a className="text-base font-semibold">{user?.UserName}</a>
          </div>
          <p className="text-sm">{user?.UserDescription}</p>
        </div>
      </div>
    </>
  );
};
