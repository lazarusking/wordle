import {
  ChartBarIcon,
  Cog8ToothIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline/";
import { memo } from "react";
export default memo(function Navbar({ setModal }) {
  return (
    <nav className="flex justify-between items-center py-1 sm:py-2 px-4 lg:pr-16 xl:pl-10">
      <div>
        <button
          className="flex items-center p-3 hover:bg-blue-300 rounded"
          aria-label="Info Icon"
          onClick={() => setModal("info")}
        >
          <InformationCircleIcon title="Info" className="w-6 h-6" />
        </button>
      </div>
      <div className="relative ml-auto items-center inline-flex space-x-">
        <div className="group inline-block">
          <button
            type="button"
            className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300"
            id="user-menu-button"
            aria-expanded="false"
          >
            <span className="sr-only">Open profile menu</span>
            <img
              className="w-8 h-8 pointer-events-none rounded-full"
              src="https://avatars.githubusercontent.com/lazarusking"
              alt="user photo"
            />
          </button>
          <div
            className="w-44 group-hover:block group-focus-within:block absolute right-0 hidden z-50 mt-2 text-base list-none bg-white rounded divide-y divide-gray-300 shadow"
            id="dropdown"
          >
            <div className="py-3 px-4">
              <span className="block text-sm text-gray-900">Accel</span>
              <span className="block text-sm font-medium text-gray-500 truncate">
                lazarusking
              </span>
            </div>
            <ul className="py-1" aria-labelledby="dropdown">
              <li>
                <a
                  href="https://www.github.com/lazarusking"
                  target={"profile"}
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 "
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/lazarusking/wordle"
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 "
                >
                  Repo
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <button
            onClick={() => setModal("stat")}
            className="flex items-center p-3 hover:bg-blue-300 rounded"
            aria-label="Chart Icon"
          >
            {/* <svg
              className="text-white block h-4 w-4"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg> */}
            <ChartBarIcon title="Chart" className="w-6 h-6" />
          </button>
          {/* <div className="group-focus-within:block hidden absolute top-0 left-0 z-50 bg-purple-600 opacity-70 h-full w-full ">
            <div className="mx-auto h-60 bg-blue-500"></div>
          </div> */}
        </div>
        <div>
          <button
            className="flex items-center p-3 hover:bg-blue-300 rounded"
            aria-label="Settings Icon"
            onClick={() => setModal("settings")}
          >
            <Cog8ToothIcon title="Settings" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
});
