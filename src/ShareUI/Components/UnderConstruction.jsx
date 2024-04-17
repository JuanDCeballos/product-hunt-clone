import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const UnderConstruction = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-center font-mono gap-10 overflow-hidden">
      <div className="flex flex-col gap-4">
        <p className="font-black text-6xl text-orange-600">Oops!</p>
        <p className="font-semibold text-3xl text-orange-600">
          Under construction
        </p>
        <p className="md:w-96">
          We are still working on this feature come back later to see it ready
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-orange-600 rounded-md w-28 text-white p-2"
        >
          <FaHome /> Go back
        </Link>
      </div>
      <div>
        <img className="w-96" src="construction-site-14.svg" alt="" />
      </div>
    </div>
  );
};

export default UnderConstruction;
