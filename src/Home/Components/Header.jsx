import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Users/Contexts/Context/UserContext.jsx"

export const Header = () => {

  const { User: Logged } = useContext(UserContext)
  let ImageURL;
  let TargetPath;

  if (!Logged) {
    ImageURL = "https://cdn-icons-png.flaticon.com/512/6326/6326055.png";
    TargetPath = "LogIn"
  }
  else {
    ImageURL = "https://www.kienyke.com/sites/default/files/styles/interna_contenido_s/public/2023-04/JH%20de%20la%20Cruz%20historia_0001_9.jpg?itok=VZnny0nN"
    TargetPath = "UserProfile"
  }

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
              <a className="text-white hover:text-gray-300">
                New
              </a>
            </li>
            <li>
              <a className="text-white hover:text-gray-300">
                Community
              </a>
            </li>
            <li>
              <a className="text-white hover:text-gray-300">
                Advertise
              </a>
            </li>
          </ul>
          <div className="flex items-center space-x-4">
            <Link to="SumbitProduct">
              <button className="text-white transition ease-in-out delay-150 bg-orange-500 hover:-translate-y-1 hover:scale-110  duration-300 w-32 h-8 rounded-lg">
                Submit
              </button>
            </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
              />
            </svg>
            <Link to={TargetPath}>
              <img
                src={ImageURL}
                className="w-10 h-10 rounded-full"
              />
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
};

