import { useContext } from "react";
import { UserContext } from '../Contexts/Context/UserContext.jsx'

export const UserProfile = () => {

  const { User } = useContext(UserContext);
  const { UserName, UserID, Picture, CommunityMember, Streak,
    Followers, Following, Profile, Work, Email, PassWord, CreatedDateTime, ModifiedDateTime,
    BIO } = User;

  return (
    <>
      <div className="flex justify-center items-center bg-gray-100 py-10">
        <div className="bg-white rounded-lg shadow-md w-full max-w-md p-10">
          <div className="flex items-center space-x-4 ">
            <img
              className="w-28 h-28 rounded-full"
              src={Picture}
              alt="User's profile picture"
            />
            <div>
              <h2 className="text-lg font-bold">{UserName}</h2>
              <p className="text-gray-500 text-sm">{UserID}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
              {CommunityMember}
            </span>
            <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs">
              {Streak} day streak
            </span>
          </div>
          <div className="mt-4 flex space-x-4">
            <div className="flex items-center space-x-1">
              <span className="text-gray-500">{Followers} followers</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-gray-500">{Following} following</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="mt-4">
              <h3 className="text-lg font-bold bg-gray-800 text-white px-2 py-1 rounded-full text-xs">
                ABOUT
              </h3>
              <p className="mt-4">{Profile}</p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold bg-gray-800 text-white px-2 py-1 rounded-full text-xs">
                WORK
              </h3>
              <p className="mt-4">{Work}</p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold bg-gray-800 text-white px-2 py-1 rounded-full text-xs">
                EMAIL
              </h3>
              <p className="mt-4">{Email}</p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold bg-gray-800 text-white px-2 py-1 rounded-full text-xs">
                PASSWORD
              </h3>
              <p className="mt-4">**********</p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold bg-gray-800 text-white px-2 py-1 rounded-full text-xs">
                CREATED AT
              </h3>
              <p className="mt-4" >{CreatedDateTime}</p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold bg-gray-800 text-white px-2 py-1 rounded-full text-xs">
                UPDATED AT
              </h3>
              <p className="mt-4">{ModifiedDateTime}</p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-lg font-bold bg-gray-800 text-white px-2 py-1 rounded-full text-xs flex justify-center">
              BIO
            </h3>
            <p className="mt-4" > {BIO} </p>
          </div>
          <div className="mt-8 flex justify-start">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Edit my profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
