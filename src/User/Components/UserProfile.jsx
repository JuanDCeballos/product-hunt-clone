export const UserProfile = () => {
  return (
    <div className="flex justify-center items-center bg-gray-100 py-10">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md p-10">
        <div className="flex items-center space-x-4 ">
          <img
            className="w-28 h-28 rounded-full"
            src="https://www.kienyke.com/sites/default/files/styles/interna_contenido_s/public/2023-04/JH%20de%20la%20Cruz%20historia_0001_9.jpg?itok=VZnny0nN"
            alt="User's profile picture"
          />
          <div>
            <h2 className="text-lg font-bold">username_here</h2>
            <p className="text-gray-500 text-sm">#_id_here</p>
          </div>
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
            New community member
          </span>
          <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs">
            2 day streak
          </span>
        </div>
        <div className="mt-4 flex space-x-4">
          <div className="flex items-center space-x-1">
            <span className="text-gray-500">0 followers</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-gray-500">0 following</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="mt-4">
            <h3 className="text-lg font-bold bg-gray-800 text-white px-2 py-1 rounded-full text-xs">
              ABOUT
            </h3>
            <p>A brief description</p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-bold bg-gray-800 text-white px-2 py-1 rounded-full text-xs">
              WORK
            </h3>
            <p>Engineering</p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-bold bg-gray-800 text-white px-2 py-1 rounded-full text-xs">
              EMAIL
            </h3>
            <p>user_email_here</p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-bold bg-gray-800 text-white px-2 py-1 rounded-full text-xs">
              PASSWORD
            </h3>
            <p>**********</p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-bold bg-gray-800 text-white px-2 py-1 rounded-full text-xs">
              CREATED AT
            </h3>
            <p>created_at_here</p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-bold bg-gray-800 text-white px-2 py-1 rounded-full text-xs">
              UPDATED AT
            </h3>
            <p>updated_at_here</p>
          </div>
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-lg font-bold bg-gray-800 text-white px-2 py-1 rounded-full text-xs flex justify-center">
            BIO
          </h3>
          <p> BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA </p>
        </div>
        <div className="mt-4 flex justify-start">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Edit my profile
          </button>
        </div>
      </div>
    </div>
  );
};
