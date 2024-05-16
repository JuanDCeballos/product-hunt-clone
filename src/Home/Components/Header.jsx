import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogInContext } from '../../Login/Context/LogInContext.jsx';
import { VscSignOut } from 'react-icons/vsc';
import { ProductContext } from '../../Product/Contexts/ProductContext.jsx';

export const Header = () => {
  const { user, logged, logOut } = useContext(LogInContext);
  const { deleteProdutToEdit } = useContext(ProductContext);

  const navigate = useNavigate();

  const onClickLogOut = async () => {
    await logOut();
    navigate('/', { replace: true });
  };

  const onSubmitClick = () => {
    deleteProdutToEdit();
  };

  return (
    <>
      <header className="bg-gray-800 p-4">
        <nav className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center justify-between w-full md:w-auto space-x-4">
            <Link to="/">
              <img
                src="https://cdn.worldvectorlogo.com/logos/product-hunt.svg"
                alt="Logo"
                className="w-10 h-10"
              />
            </Link>
            <form className="max-w-md mx-auto md:mx-0">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-1 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search"
                  required
                />
              </div>
            </form>
          </div>

          <ul className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-9">
            <li className="group">
              <Link to="/" className="text-white hover:text-gray-300">
                Launches
              </Link>
            </li>
            <li>
              <Link to="/" className="text-white hover:text-gray-300">
                Product
              </Link>
            </li>
            <li>
              <Link
                to="UnderConstruction"
                className="text-white hover:text-gray-300"
              >
                New
              </Link>
            </li>
            <li>
              <Link to="Community" className="text-white hover:text-gray-300">
                Community
              </Link>
            </li>
            <li>
              <Link
                to="UnderConstruction"
                className="text-white hover:text-gray-300"
              >
                Advertise
              </Link>
            </li>
          </ul>
          <div className="flex items-center space-x-4">
            {!logged ? (
              <>
                <Link to="UnderConstruction">
                  <p className="text-white transition ease-in-out delay-150 hover:text-gray-300 w-32 h-8 rounded-lg">
                    How to post?
                  </p>
                </Link>
                <Link to="/LogIn">
                  <button className="text-white transition ease-in-out delay-150 bg-red-500 hover:-translate-y-1 hover:scale-110  duration-300 w-32 h-8 rounded-lg">
                    Log In
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link to="SumbitProduct">
                  <button
                    onClick={onSubmitClick}
                    className="text-white transition ease-in-out delay-150 bg-red-500 hover:-translate-y-1 hover:scale-110  duration-300 w-32 h-8 rounded-lg"
                  >
                    Submit
                  </button>
                </Link>
                <button
                  className="text-white hover:text-gray-300  text-2xl"
                  onClick={onClickLogOut}
                >
                  <VscSignOut />
                </button>
                <Link to="/UserProfile">
                  <img src={user.photoURL} className="w-10 h-10 rounded-full" />
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};
