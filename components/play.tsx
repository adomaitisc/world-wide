import { useState } from "react";

type ButtonProps = {
  play: boolean;
};

const Play = () => {
  const [isPlayed, setIsPlayed] = useState(false);

  return (
    <div className="flex flex-row justify-center align-middle w-full">
      <div className="flex flex-col w-60">
        <PlayOrScore play={isPlayed} />
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

const PlayOrScore: React.FC<ButtonProps> = ({ play }) => {
  if (play) {
    return (
      <button className="text-green-600 font-normal border-2 rounded-lg py-2 px-2 w-full">
        play
      </button>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold text-green-600 text-left">
            Amazing!
          </h1>
          <div className="mt-4" />
          <div className="flex flex-row items-end justify-start">
            <h1 className="text-5xl font-bold text-green-800 text-center">
              395
            </h1>
            <p className="text-md  font-semibold text-gray-600 mb-1">/500</p>
          </div>
          <div className="mt-2" />
          <p className="text-gray-600 font-medium">23.5km away</p>
          <p className="text-gray-400 font-normal">community score: 225/500</p>
          <div className="mt-4" />
        </div>
        <button className="text-green-600 font-normal border-2 rounded-lg py-2 px-2 w-full">
          share on social media
        </button>
      </div>
    );
  }
};

export default Play;
