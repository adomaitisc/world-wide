import { useState } from "react";

const Navbar = () => {
  const [showScores, setShowScores] = useState(false);
  const [showMore, setshowMore] = useState(false);

  return (
    <div className="flex flex-row w-full justify-between items-center">
      <div className="w-60">
        <button
          className="text-gray-700 font-semibold text-2xl"
          onClick={() => setShowScores(!showScores)}
        >
          scores ↓
        </button>
        {showScores ? (
          <div className="absolute bg-gray-50 shadow-lg rounded-lg w-60 z-10">
            <div className="m-6">
              <div className="mt-4" />
              <p className="text-lg text-gray-400 font-normal flex flex-row justify-between">
                played games
                <p className="font-medium text-orange-500">19</p>
              </p>
              <div className="mt-2" />
              <p className="text-lg text-gray-400 font-normal flex flex-row justify-between">
                average score
                <p className="font-medium text-violet-500">334</p>
              </p>
              <div className="mt-2" />
              <p className="text-lg text-gray-400 font-normal flex flex-row justify-between">
                best game<p className="font-medium text-green-500">476</p>
              </p>
              <div className="mt-2" />
              <p className="text-lg text-gray-400 font-normal flex flex-row justify-between">
                worst game<p className="font-medium text-red-500">122</p>
              </p>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col">
        <h1 className="text-4xl font-extrabold text-gray-700 text-center">
          world wide
        </h1>
      </div>

      <div className="w-60 text-end">
        <button
          className="text-gray-700 font-semibold text-2xl"
          onClick={() => setshowMore(!showMore)}
        >
          more ↓
        </button>
        {showMore ? (
          <div className="absolute bg-gray-50 shadow-lg rounded-lg w-60 z-10">
            <div className="m-6 text-start">
              <div className="mt-4" />
              <a className="text-lg text-pink-500 font-normal hover:text-pink-400 hover:cursor-pointer">
                + github repo
              </a>
              <div className="mt-2" />
              <a className="text-lg text-yellow-500 font-normal hover:text-yellow-400 hover:cursor-pointer">
                + give feedback
              </a>
              <div className="mt-2" />
              <a className="text-lg text-blue-500 font-normal hover:text-blue-400 hover:cursor-pointer">
                + pay me a coffee
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
