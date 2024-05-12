import { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { GetUsersList } from '../../Firebase/Functions';
import { toast } from 'sonner';
import { SimpleUserProfileView } from './SimpleUserProfileView';
import { RiUserFollowLine } from 'react-icons/ri';

export const UserListComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [users, setUsers] = useState([]);
  const [originalList, setOriginalList] = useState([]);
  const [isGettingData, setIsGettingData] = useState(true);

  useEffect(() => {
    toast.promise(GetUsersList(), {
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

  const onInputChanged = (e) => {
    setInputValue(e.target.value);
  };

  const onFollowClicked = () => {
    toast.success('It works!');
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
              value={inputValue}
              onChange={onInputChanged}
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
                      <div className="flex flex-row place-content-between">
                        <SimpleUserProfileView key={users.id} user={users} />
                        <button
                          className="mr-10 text-orange-500 hover:text-orange-300"
                          onClick={() => onFollowClicked(users)}
                        >
                          <div className="flex flex-row items-center content-center">
                            <RiUserFollowLine className="mr-2" />
                            Follow
                          </div>
                        </button>
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
