import React from "react";

const HomeScreen = () => {
  return (
    <div className="px-2">
      <table className=" bg-white rounded-lg mx-auto my-6 p-16 table-auto">
        <thead className="justify-between">
          <tr className="bg-gray-400">
            <th className="px-16 py-2">
              <span className="text-gray-300"></span>
            </th>
            <th className="px-16 py-2">
              <span className="text-gray-300">Name</span>
            </th>
            <th className="px-16 py-2">
              <span className="text-gray-300">Invitation</span>
            </th>
            <th className="px-16 py-2">
              <span className="text-gray-300">Date</span>
            </th>

            <th className="px-16 py-2">
              <span className="text-gray-300">Time</span>
            </th>

            <th className="px-16 py-2">
              <span className="text-gray-300">Status</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-200">
          <tr className="bg-white border-4 border-gray-200">
            <td className="px-16 py-2 flex flex-row items-center">
              <img
                className="h-8 w-8 rounded-full object-cover "
                src="https://randomuser.me/api/portraits/men/30.jpg"
                alt=""
              />
            </td>
            <td>
              <span className="text-center ml-2 font-semibold">Dean Lynch</span>
            </td>
            <td className="px-16 py-2">
              <button className="bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black ">
                Open Link
              </button>
            </td>
            <td className="px-16 py-2">
              <span>05/06/2020</span>
            </td>
            <td className="px-16 py-2">
              <span>10:00</span>
            </td>

            <td className="px-16 py-2">
              <span className="text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h5 "
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M5 12l5 5l10 -10" />
                </svg>
              </span>
            </td>
          </tr>
          <tr className="bg-white border-4 border-gray-200">
            <td className="px-16 py-2 flex flex-row items-center">
              <img
                className="h-8 w-8 rounded-full object-cover "
                src="https://randomuser.me/api/portraits/men/76.jpg"
                alt=""
              />
            </td>
            <td>
              <span className="text-center ml-2 font-semibold">
                Ralph Barnes
              </span>
            </td>
            <td className="px-16 py-2">
              <button className="bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black ">
                Open Link
              </button>
            </td>
            <td className="px-16 py-2">
              <span>05/06/2020</span>
            </td>
            <td className="px-16 py-2">
              <span>12:15</span>
            </td>

            <td className="px-16 py-2">
              <span className="text-yellow-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx="12" cy="12" r="9" />
                  <polyline points="12 7 12 12 15 15" />
                </svg>
              </span>
            </td>
          </tr>
          <tr className="bg-white border-4 border-gray-200">
            <td className="px-16 py-2 flex flex-row items-center">
              <img
                className="h-8 w-8 rounded-full object-cover "
                src="https://randomuser.me/api/portraits/men/38.jpg"
                alt=""
              />
            </td>
            <td>
              <span className="text-center ml-2 font-semibold">
                Brett Castillo
              </span>
            </td>
            <td className="px-16 py-2">
              <button className="bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black ">
                Open Link
              </button>
            </td>
            <td className="px-16 py-2">
              <span>05/06/2020</span>
            </td>
            <td className="px-16 py-2">
              <span>08:35</span>
            </td>

            <td className="px-16 py-2">
              <span className="text-yellow-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HomeScreen;
