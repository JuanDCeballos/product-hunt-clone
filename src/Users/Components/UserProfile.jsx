import { useState, useContext } from 'react';
import { LogInContext } from '../../Login/Context';

export const UserProfile = () => {
  const { user } = useContext(LogInContext);
  const {
    displayName,
    UserID,
    photoURL,
    CommunityMember,
    Streak,
    Followers,
    Following,
    Reviews,
    Profile,
    Work,
    Email,
    CreatedDateTime,
    ModifiedDateTime,
    BIO,
  } = user;

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const inputBorderColor = isEditing ? 'border-blue-500' : 'border-gray-300';

  return (
    <>
      <div className="flex justify-center items-center bg-gray-100 py-10">
        <div className="bg-white rounded-lg shadow-md w-full max-w-3xl p-10">
          <div className="flex space-x-6">
            <div>
              <img
                className="w-32 h-32 rounded-full border-4 border-gray-800"
                src={photoURL}
                alt="User's profile photoURL"
              />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                {displayName}
              </h1>
              <p className="text-gray-500">@{UserID}</p>
              <input
                type="text"
                className=""
                value={Profile}
                disabled={!isEditing}
              />
              <div className="mt-4 flex">
                <div className="mr-6 text-center">
                  <p className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                    Reviews
                  </p>
                  <p className="font-semibold">{Reviews}</p>
                </div>
                <div className="mr-6 text-center">
                  <p className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                    Followers
                  </p>
                  <p className="font-semibold">{Followers}</p>
                </div>
                <div className="text-center">
                  <p className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs">
                    Following
                  </p>
                  <p className="font-semibold">{Following}</p>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-6 border-b-2 border-gray-700" />
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Additional Information
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-500 font-semibold">Community Member</p>
                <input
                  type="text"
                  className={`border rounded-md p-2 w-full ${inputBorderColor}`}
                  value={CommunityMember}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <p className="text-gray-500 font-semibold">Streak</p>
                <input
                  type="text"
                  className={`border rounded-md p-2 w-full ${inputBorderColor}`}
                  value={`${Streak} day streak`}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <p className="text-gray-500 font-semibold">Work</p>
                <input
                  type="text"
                  className={`border rounded-md p-2 w-full ${inputBorderColor}`}
                  value={Work}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <p className="text-gray-500 font-semibold">Email</p>
                <input
                  type="text"
                  className={`border rounded-md p-2 w-full ${inputBorderColor}`}
                  value={Email}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <p className="text-gray-500 font-semibold">Created At</p>
                <input
                  type="text"
                  className={`border rounded-md p-2 w-full ${inputBorderColor}`}
                  value={CreatedDateTime}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <p className="text-gray-500 font-semibold">Updated At</p>
                <input
                  type="text"
                  className={`border rounded-md p-2 w-full ${inputBorderColor}`}
                  value={ModifiedDateTime}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
          <hr className="my-6 border-b-2 border-gray-700" />
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800">Bio</h2>
            {isEditing ? (
              <input
                type="text"
                value={BIO}
                onChange={(e) => console.log(e.target.value)}
                className="mt-2 border rounded-md p-2 w-full"
              />
            ) : (
              <p className="mt-2">{BIO}</p>
            )}
          </div>

          <div className="mt-8 flex justify-start">
            {isEditing ? (
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-4">
                Save Changes
              </button>
            ) : (
              <button
                className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-4"
                onClick={handleEditClick}
              >
                Edit Profile
              </button>
            )}
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
