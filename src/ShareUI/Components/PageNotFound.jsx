import { SiProbot } from 'react-icons/si';
import { Link } from 'react-router-dom';

export const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 animation">
      <div className="bg-white shadow-md rounded-lg p-8">
        <div className="flex items-center justify-center mb-4">
          <SiProbot className="text-orange-500 animate-spin text-4xl mr-2" />
          <h1 className="text-2xl font-bold text-orange-500">
            Página no encontrada
          </h1>
        </div>
        <p className="text-gray-600 mb-6 animate-pulse">
          Lo sentimos, el enlace que buscas no existe.
        </p>
        <Link
          to="/"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out animate-bounce"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};
