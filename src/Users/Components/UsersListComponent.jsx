import { useContext, useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoCloseCircleOutline } from 'react-icons/io5';
import {
  GetUsersList,
  FollowUser,
  UnFollowUser,
} from '../../Firebase/Functions';
import { toast } from 'sonner';
import { SimpleUserProfileView } from './SimpleUserProfileView';
import { RiUserFollowLine, RiUserUnfollowLine } from 'react-icons/ri';
import { LogInContext } from '../../Login/Context';

export const UserListComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [users, setUsers] = useState([]);
  const [originalList, setOriginalList] = useState([]);
  const [isGettingData, setIsGettingData] = useState(true);
  const { user } = useContext(LogInContext);

  useEffect(() => {
    toast.promise(GetUsersList(user.uid, user.provider), {
      loading: 'Getting users...',
      error: 'An error ocurred while trying to get users.',
      success: (result) => {
        setUsers(result.users);
        setOriginalList(result.users);
        setIsGettingData(false);
        return 'Users obtained successfully!';
      },
    });
  }, []);

  const onDeleteClicked = () => {
    setInputValue('');
    setUsers(originalList);
  };

  const onInputChanged = (value) => {
    setInputValue(value);
    if (!value) {
      setUsers(originalList);
    } else {
      setUsers(
        users.filter((user) =>
          user.UserName.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const onUnfollowClicked = (selectedUser) => {
    toast.promise(
      UnFollowUser(
        user.uid,
        user.provider,
        selectedUser.id,
        selectedUser.provider
      ),
      {
        loading: 'Unfollowing user...',
        error: `An error ocurred while trying to unfollow ${selectedUser.UserName}`,
        success: () => {
          const targetIndex = users.findIndex(
            (users) => users.id == selectedUser.id
          );
          const usersToModify = [...users];
          usersToModify[targetIndex].followed =
            !usersToModify[targetIndex].followed;
          setUsers(usersToModify);
          return `Now you aren't following ${selectedUser.UserName}`;
        },
      }
    );
  };

  const onFollowClicked = (selectedUser) => {
    const currentUserFollowerData = {
      UserDescription: user.profileDesc
        ? user.profileDesc
        : "User doesn't have description",
      UserName: user.displayName,
      UserPhotoURL: user.photoURL,
      UserID: user.uid,
      provider: user.provider,
    };

    const userFollowedData = {
      UserDescription: selectedUser.UserDescription
        ? selectedUser.UserDescription
        : "User doesn't have description",
      UserName: selectedUser.UserName,
      UserPhotoURL: selectedUser.UserPhotoURL,
      UserID: selectedUser.id,
      provider: selectedUser.provider,
    };

    toast.promise(
      FollowUser(
        user.uid,
        user.provider,
        currentUserFollowerData,
        selectedUser.id,
        selectedUser.provider,
        userFollowedData
      ),
      {
        loading: 'Following user...',
        error: `An error ocurred while trying to follow ${selectedUser.UserName}`,
        success: (result) => {
          const targetIndex = users.findIndex(
            (users) => users.id == selectedUser.id
          );
          const usersToModify = [...users];
          usersToModify[targetIndex].followed =
            !usersToModify[targetIndex].followed;
          setUsers(usersToModify);
          return result.message;
        },
      }
    );
  };

  const onSearch = () => {
    if (!inputValue) {
      setUsers(originalList);
    } else {
      setUsers(
        users.filter((user) =>
          user.UserName.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    }
  };

  return (
    <>
      <div className="flex flex-col  justify-start items-center p-4 bg-gray-100 ">
        <div className="flex mt-4 w-4/5 items-center justify-center bg-white rounded-xl shadow-2xl">
          <div className="flex justify-stretch h-12 w-3/4 items-center mt-4 mb-4 rounded-full border-2 border-blue-950 ">
            <input
              type="text"
              className="h-10 w-11/12 text-left focus:outline-none ml-4"
              onChange={(e) => onInputChanged(e.target.value)}
              value={inputValue}
            />
            <IoCloseCircleOutline
              className="mr-2 cursor-pointer text-slate-900 hover:text-slate-600 size-5"
              onClick={onDeleteClicked}
            />
            <CiSearch
              className="mr-2 cursor-pointer text-slate-900 hover:text-slate-600 size-5"
              onClick={onSearch}
            />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-2xl w-4/5 mt-4 flex flex-col">
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col space-y-8">
              {users | (users.length > 0) ? (
                <div className="flex flex-col place-content-between">
                  {users.map((users) => (
                    <>
                      <div
                        key={users.id}
                        className="flex flex-row place-content-between"
                      >
                        <SimpleUserProfileView user={users} key={users.id} />
                        {users.followed ? (
                          <>
                            <button
                              className="mr-10 text-orange-500 hover:text-orange-300"
                              onClick={() => onUnfollowClicked(users)}
                              key={users.id}
                            >
                              <div
                                key={users.id}
                                className="flex flex-row items-center content-center"
                              >
                                <RiUserUnfollowLine className="mr-2" />
                                Unfollow
                              </div>
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="mr-10 text-orange-500 hover:text-orange-300"
                              onClick={() => onFollowClicked(users)}
                            >
                              <div className="flex flex-row items-center content-center">
                                <RiUserFollowLine className="mr-2" />
                                Follow
                              </div>
                            </button>
                          </>
                        )}
                      </div>
                    </>
                  ))}
                </div>
              ) : !isGettingData ? (
                <>
                  <div className="flex flex-col justify-center items-center mt-4">
                    <p className="font-black text-2xl">
                      We don't find any user with this name
                    </p>
                    <img src="NoUserFound.svg" className="size-48" />
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
