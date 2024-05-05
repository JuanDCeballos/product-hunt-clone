import { useContext } from 'react';
import { UserContext } from '../../Users/Contexts/Context/UserContext.jsx';
import { Link } from 'react-router-dom';
import { UserExampleData } from '../../Users/Helpers/ExampleData.js';
import { FaGithub } from 'react-icons/fa';
import { FaGoogle } from 'react-icons/fa';

export const LogInComponent = () => {
  const { SetUser } = useContext(UserContext);
  const LogInUser = () => {
    SetUser(UserExampleData);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
          <div className="flex flex-col items-center mb-6">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMuAokGMN-Bp1jwGmTOmfBaxngSK5jOq7WH7idmg_2EQ&s"
              alt="Product Hunt"
              className="w-20 h-20 rounded-full"
            />
            <h1 className="text-2xl font-semibold mt-4">
              Sign up on Product Hunt
            </h1>
          </div>
          <p className="text-gray-600 text-center mb-8">
            Join our community of friendly folks discovering and sharing the
            latest products in tech.
          </p>
          <div className="space-y-4">
            <button
              className="flex items-center justify-center bg-white text-gray-700 border border-gray-300 rounded-md py-3 px-4 w-full hover:bg-gray-100"
              onClick={LogInUser}
            >
              <div className="mr-4">
                <FaGoogle className="text-black size-9 text-2xl" />
              </div>
              Sign in with Google
            </button>
            <button
              className="flex items-center justify-center bg-gray-800 text-white rounded-md py-3 px-4 w-full hover:bg-gray-700"
              onClick={LogInUser}
            >
              <div className="mr-4">
                <FaGithub className="text-white size-9 text-2xl" />
              </div>
              <div>Sign in with GitHub</div>
            </button>
          </div>
          <p className="text-gray-500 text-sm text-center mt-6">
            We'll never post to any of your accounts without your permission.
          </p>
        </div>
      </div>
    </>
  );
};
