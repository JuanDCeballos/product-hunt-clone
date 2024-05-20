import { useContext, useEffect, useState } from 'react';
import { LogInContext } from '../../Login/Context';
import { GetFollowedUsers, UnFollowUser } from '../../Firebase/Functions';
import { toast } from 'sonner';
import { SimpleUserProfileView } from './SimpleUserProfileView';
import { useNavigate } from 'react-router-dom';
import { RiUserUnfollowLine } from 'react-icons/ri';

export const FollowedUsersListComponent = () => {
  const { user } = useContext(LogInContext);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [gettingData, setGettingData] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    toast.promise(GetFollowedUsers(user.uid, user.provider), {
      loading: 'Get followed users...',
      error: 'An error ocurred while trying to get followed users.',
      success: (data) => {
        setFollowedUsers(data.users);
        setGettingData(false);
        return 'Users obtained successfully!';
      },
    });
  }, []);

  const onUnfolowClicked = (followedUser) => {
    toast.promise(
      UnFollowUser(
        user.uid,
        user.provider,
        followedUser.UserID,
        followedUser.provider
      ),
      {
        loading: 'Unfollow user...',
        error: 'An error ocurred while trying to unfollow user.',
        success: () => {
          setFollowedUsers(
            followedUsers.filter((U) => U.id != followedUser.id)
          );
          return 'User unfollowed!';
        },
      }
    );
  };

  return (
    <>
      <div className="flex flex-col space-y-8 mt-10">
        <div className="space-y-4 w-3/4">
          <div className="flex flex-row space-x-6 ">
            <h4 className="font-semibold"> Followed Users </h4>
          </div>
        </div>
        <div className="w-full border-b border-indigo-100 px-6"></div>
        <div className="flex flex-col space-y-8">
          {followedUsers | (followedUsers.length > 0) ? (
            <div className="flex flex-col place-content-between">
              {followedUsers.map((followedUser) => (
                <>
                  <div className="flex flex-row place-content-between">
                    <SimpleUserProfileView
                      key={followedUser.id}
                      user={followedUser}
                    />
                    <button
                      className="mr-10 text-orange-500 hover:text-orange-300"
                      onClick={() => onUnfolowClicked(followedUser)}
                    >
                      <div className="flex flex-row items-center content-center">
                        <RiUserUnfollowLine className="mr-2" />
                        Unfollow
                      </div>
                    </button>
                  </div>
                </>
              ))}
            </div>
          ) : !gettingData ? (
            <div
              className="flex flex-col cursor-pointer"
              onClick={() => {
                navigate('/Community', { replace: true });
              }}
            >
              <div className="flex flex-col justify-center items-center">
                <p className="font-black text-2xl">
                  You need to follow someone first!
                </p>
                <img src="FollowUser.svg" className="size-48" />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
