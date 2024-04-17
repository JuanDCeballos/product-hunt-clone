import { SiProbot } from 'react-icons/si';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 animation">
      <div className="bg-white shadow-md rounded-lg p-8">
        <div className="flex items-center justify-center mb-4">
          <SiProbot className="text-orange-500 animate-spin text-4xl mr-4" />
          <h1 className="text-2xl font-bold text-orange-500">
            Page not found!
          </h1>
        </div>
        <p className="text-gray-600 mb-6 animate-pulse">
          Sorry, this path is not available.
        </p>
        <Link
          to="/"
          className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
        >
          <FaHome className="mr-2" />
          Go back
        </Link>
      </div>
    </div>
  );
};
