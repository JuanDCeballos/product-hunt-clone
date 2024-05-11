import { useContext, useEffect, useState } from 'react';
import { LogInContext } from '../../Login/Context';
import { GetFollowers } from '../../Firebase/Functions';
import { toast } from 'sonner';
import { SimpleUserProfileView } from './SimpleUserProfileView';
import { useNavigate } from 'react-router-dom';

export const FollowerUsersList = () => {
  const { user } = useContext(LogInContext);
  const [followers, setFollowers] = useState([]);
  const [gettingData, setGettingData] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    toast.promise(GetFollowers(user.uid, user.provider), {
      loading: 'Obteniendo usuarios seguidos...',
      error: 'An error ocurred while trying to get followed users.',
      success: (data) => {
        setFollowers(data.users);
        setGettingData(false);
        return 'Users obtained successfully!';
      },
    });
  }, []);

  return (
    <>
      <div className="flex flex-col space-y-8 mt-10">
        <div className="space-y-4 w-3/4">
          <div className="flex flex-row space-x-6 ">
            <h4 className="font-semibold"> Followers </h4>
          </div>
          <div className="border-b border-indigo-100 px-6"></div>
        </div>

        <div className="flex flex-col space-y-8">
          {followers | (followers.length > 0) ? (
            followers.map((user) => (
              <SimpleUserProfileView key={user.id} user={user} />
            ))
          ) : !gettingData ? (
            <div
              className="flex flex-col cursor-pointer"
              onClick={() => {
                navigate('/Community', { replace: true });
              }}
            >
              <div className="flex flex-col justify-center items-center space-y-2">
                <p className="font-black text-2xl">
                  You does not have followers
                </p>
                <p className="font-black text-base">
                  Work hard to get your first follower!
                </p>
                <img src="NoFollowers.svg" className="size-48" />
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
