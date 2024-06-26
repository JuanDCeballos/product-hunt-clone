import { useState, useContext, useRef, useEffect } from 'react';
import { LogInContext } from '../../Login/Context';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { UpdateUser } from '../../Firebase/Functions';
import { UserProductListComponent } from '../../Product/Components/UserProductListComponent';
import { UserProfileViewTypes } from '../Helpers';
import { FollowedUsersListComponent } from './FollowedUsersListComponent';
import { FollowerUsersList } from './FollowerUsersList';

export const UserProfile = () => {
  const { user, provider, updateCurrentUserInfo } = useContext(LogInContext);

  const textAreaRef = useRef();
  const [val, setVal] = useState(user.bio);
  const [isEditing, setIsEditing] = useState(false);
  const [currentViewType, setCurrentViewType] = useState(
    UserProfileViewTypes.UserInformation
  );

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + 'px';
    }
  }, [val]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const inputBorderColor = isEditing ? 'border-blue-500' : 'border-gray-300';

  const onSubmit = (data) => {
    if (!data) {
      toast.error('An error ocurred. Try again!');
      return;
    }

    data.bio = val;

    const newData = { ...data, updatedAt: new Date().toLocaleDateString() };

    toast.promise(UpdateUser(user.uid, newData, provider), {
      loading: 'Updating user...',
      success: 'User updated successfully!',
      error: 'An error ocurred while trying to update user.',
    });

    const newUser = {
      ...user,
      bio: data.bio,
      communityMember: data.communityMember,
      email: data.email,
      profileDesc: data.profileDesc,
      work: data.work,
      updatedAt: newData.updatedAt,
    };

    updateCurrentUserInfo(newUser);

    setIsEditing((prevVal) => !prevVal);
  };

  const onCancelClick = () => {
    setVal(user.bio);
    setIsEditing(false);
    reset();
  };

  const GetCurrenViewByType = (currenViewType) => {
    switch (currenViewType) {
      case UserProfileViewTypes.UserInformation:
        return (
          <>
            <hr className="my-6 border-b-2 border-gray-700" />
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Additional Information
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-500 font-semibold">
                    Community Member
                  </p>
                  <input
                    {...register('communityMember', { required: true })}
                    placeholder="Community here..."
                    type="text"
                    className={`border rounded-md p-2 w-full ${inputBorderColor}`}
                    value={!isEditing ? user.communityMember : undefined}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <p className="text-gray-500 font-semibold">Streak</p>
                  <input
                    type="text"
                    className="border rounded-md p-2 w-full border-gray-300"
                    disabled={true}
                    value={1}
                  />
                </div>
                <div>
                  <p className="text-gray-500 font-semibold">Work</p>
                  <input
                    {...register('work', { required: true })}
                    placeholder="Work here..."
                    type="text"
                    className={`border rounded-md p-2 w-full ${inputBorderColor}`}
                    value={!isEditing ? user.work : undefined}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <p className="text-gray-500 font-semibold">Email</p>
                  <input
                    {...register('email', { required: true })}
                    placeholder="Email here..."
                    type="text"
                    className={`border rounded-md p-2 w-full ${inputBorderColor}`}
                    value={!isEditing ? user.email : undefined}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <p className="text-gray-500 font-semibold">Created At</p>
                  <input
                    type="text"
                    className="border rounded-md p-2 w-full border-gray-300"
                    value={user.createdAt}
                    disabled={true}
                  />
                </div>
                <div>
                  <p className="text-gray-500 font-semibold">Updated At</p>
                  <input
                    type="text"
                    className="border rounded-md p-2 w-full border-gray-300"
                    value={user.updatedAt}
                    disabled={true}
                  />
                </div>
              </div>
            </div>
            <hr className="my-6 border-b-2 border-gray-700" />
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-800">Biography</h2>
              <>
                <textarea
                  {...register('bio')}
                  type="text"
                  value={val}
                  className={`border rounded-md overflow-hidden p-2 w-full resize-none ${inputBorderColor}`}
                  disabled={!isEditing}
                  onChange={(e) => setVal(e.target.value)}
                  ref={textAreaRef}
                ></textarea>
              </>
            </div>

            <div className="mt-8 flex justify-start">
              {isEditing ? (
                <>
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-4"
                  >
                    Save Changes
                  </button>
                  <div
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    onClick={onCancelClick}
                  >
                    Cancel
                  </div>
                </>
              ) : (
                <div
                  className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-4 cursor-pointer"
                  onClick={handleEditClick}
                >
                  Edit Profile
                </div>
              )}
            </div>
          </>
        );
      case UserProfileViewTypes.Followers:
        return <FollowerUsersList />;

      case UserProfileViewTypes.Following:
        return <FollowedUsersListComponent />;

      case UserProfileViewTypes.Products:
        return <UserProductListComponent />;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center items-center bg-gray-100 py-10">
          <div className="bg-white rounded-lg shadow-md w-full max-w-3xl p-10">
            <div className="flex space-x-6">
              <div>
                <img
                  className="w-32 h-32 rounded-full border-4 border-gray-800"
                  src={user.photoURL}
                  alt="User's profile photoURL"
                />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">
                  {user.displayName}
                </h1>
                <p className="text-gray-500">@{user.displayName}</p>
                <input
                  {...register('profileDesc', { required: true })}
                  type="text"
                  className={`border rounded-md p-2 mt-2 w-full ${inputBorderColor}`}
                  value={!isEditing ? user.profileDesc : undefined}
                  disabled={!isEditing}
                  placeholder="Description here..."
                />
                <div className="mt-4 flex">
                  <div
                    className="mr-6 text-center cursor-pointer"
                    onClick={() => {
                      setCurrentViewType(UserProfileViewTypes.UserInformation);
                    }}
                  >
                    <p className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                      Information
                    </p>
                  </div>
                  <div
                    className="mr-6 text-center cursor-pointer"
                    onClick={() => {
                      setCurrentViewType(UserProfileViewTypes.Followers);
                    }}
                  >
                    <p className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                      Followers
                    </p>
                    <p className="font-semibold">{user.Followers}</p>
                  </div>
                  <div
                    className="text-center cursor-pointer"
                    onClick={() => {
                      setCurrentViewType(UserProfileViewTypes.Following);
                    }}
                  >
                    <p className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs">
                      Following
                    </p>
                    <p className="font-semibold">{user.Following}</p>
                  </div>
                  <div
                    className="flex ml-6 text-center cursor-pointer"
                    onClick={() => {
                      setCurrentViewType(UserProfileViewTypes.Products);
                    }}
                  >
                    <p className="bg-green-500 text-white px-2 py-1 rounded-full text-xs text-center">
                      Products
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {GetCurrenViewByType(currentViewType)}
          </div>
        </div>
      </form>
    </>
  );
};
