import { useState } from "react";
import GoogleMap from "./google-map";

const Play = () => {
  const [isPlayed, setIsPlayed] = useState(false);

  return (
    <div className="flex flex-row justify-center items-center w-3/4 h-3/4">
      <div className="flex flex-col justify-center items-center w-full h-full">
        <Game played={isPlayed} />
        <button
          onClick={() => setIsPlayed(!isPlayed)}
          className="text-xs text-gray-400 mt-2 w-full"
        >
          toggle state
        </button>
      </div>
    </div>
  );
};

type ButtonProps = {
  played: boolean;
};

const Game: React.FC<ButtonProps> = ({ played }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return <>{played ? <Summary /> : <Loader />}</>;
};

const Summary = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col">
        <h1 className="text-3xl font-semibold text-green-600 text-left">
          Amazing!
        </h1>
        <div className="mt-4" />
        <div className="flex flex-row items-end justify-start">
          <h1 className="text-5xl font-bold text-green-800 text-center">395</h1>
          <p className="text-md  font-semibold text-gray-600 mb-1">/500</p>
        </div>
        <div className="mt-2" />
        <p className="text-gray-600 font-medium">23.5km away</p>
        <p className="text-gray-400 font-normal">community score: 225/500</p>
        <div className="mt-4" />
      </div>
      <button className="text-green-600 font-normal border-2 rounded-lg py-2 px-2 w-60">
        share on social media
      </button>
    </div>
  );
};

const Loader = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <>
      {isPlaying ? (
        <>
          <GoogleMap />
          <div className="mt-4"></div>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-green-600 font-normal border-2 rounded-lg py-2 px-2 w-60"
          >
            exit game
          </button>
        </>
      ) : (
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-green-600 font-normal border-2 rounded-lg py-2 px-2 w-60"
        >
          play
        </button>
      )}
    </>
  );
};

export default Play;
