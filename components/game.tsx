import { ReactNode, Ref, useRef, useState } from "react";
import GoogleMap from "./google-map";

type ButtonProps = {
  played: boolean;
};

type ActionProps = {
  hasGuessed: boolean;
  onPlay: any;
};

type GameProps = {
  onGuess: any;
};

const Game = () => {
  const coordinatesList = [
    [21, -44],
    [-40, 12],
  ];

  const [isPlaying, setIsPlaying] = useState(false); // if playing: show game, else show play button
  const [hasGuessed, setHasGuessed] = useState(false); // if guessed, show summary
  const [guess, setGuess] = useState([]); // guess = [latitude, logitude]

  const onPlay = () => {
    setIsPlaying(true);
  };

  const onGuess = (e: any) => {
    console.log(e);
    setIsPlaying(false);
    setGuess(e);
    setHasGuessed(true);
  };

  //Click play button: hide play button -> show game

  //Click guess button: hide game -> show summary
  //Calculate points
  //Click quit game: hide game -> show play button

  return (
    <>
      {!isPlaying ? (
        <ActionInterface hasGuessed={hasGuessed} onPlay={onPlay} />
      ) : (
        <GameInterface onGuess={onGuess} />
      )}
    </>
  );
};

const ActionInterface: React.FC<ActionProps> = ({ hasGuessed, onPlay }) => {
  return (
    <>
      {!hasGuessed ? (
        <button
          onClick={() => {
            onPlay();
          }}
        >
          Play button
        </button>
      ) : (
        <h1>Game Summary</h1>
      )}
    </>
  );
};

const GameInterface: React.FC<GameProps> = ({ onGuess }) => {
  const [guess, setGuess] = useState([]);

  const onCoordsChange = (e: any) => {
    setGuess(e);
  };

  return (
    <>
      <button
        onClick={() => {
          onGuess(guess);
        }}
      >
        Guess
      </button>
      <div className="mb-4" />
      <div className="w-full h-full relative">
        <p>Street View</p>
        <div className="absolute right-0 bottom-0 w-2/5 h-2/5">
          <GoogleMap onCoordsChange={onCoordsChange} />
        </div>
      </div>
    </>
  );
};

// const Play = () => {
//   const [isPlayed, setIsPlayed] = useState(false);

//   return (
//     <div className="flex flex-row justify-center items-center w-3/4 h-3/4">
//       <div className="flex flex-col justify-center items-center w-full h-full">
//         <GameInstance played={isPlayed} />
//         <button
//           onClick={() => setIsPlayed(!isPlayed)}
//           className="text-xs text-gray-400 mt-2 w-full"
//         >
//           toggle state
//         </button>
//       </div>
//     </div>
//   );
// };

// const GameInstance: React.FC<ButtonProps> = ({ played }) => {
//   const [isPlaying, setIsPlaying] = useState(false);

//   return <>{played ? <Summary /> : <Loader />}</>;
// };

// const Summary = () => {
//   return (
//     <div className="flex flex-col items-center justify-center w-full">
//       <div className="flex flex-col">
//         <h1 className="text-3xl font-semibold text-green-600 text-left">
//           Amazing!
//         </h1>
//         <div className="mt-4" />
//         <div className="flex flex-row items-end justify-start">
//           <h1 className="text-5xl font-bold text-green-800 text-center">395</h1>
//           <p className="text-md  font-semibold text-gray-600 mb-1">/500</p>
//         </div>
//         <div className="mt-2" />
//         <p className="text-gray-600 font-medium">23.5km away</p>
//         <p className="text-gray-400 font-normal">community score: 225/500</p>
//         <div className="mt-4" />
//       </div>
//       <button className="text-green-600 font-normal border-2 rounded-lg py-2 px-2 w-60">
//         share on social media
//       </button>
//     </div>
//   );
// };

// const Loader = () => {
//   const [isPlaying, setIsPlaying] = useState(false);

//   return (
//     <>
//       {isPlaying ? (
//         <>
//           <button
//             onClick={() => setIsPlaying(!isPlaying)}
//             className="text-red-400 font-normal w-auto"
//           >
//             leave game →
//           </button>
//           <div className="mb-4" />
//           <div className="w-full h-full relative">
//             <p>Street View</p>
//             <div className="absolute right-0 bottom-0 w-2/5 h-2/5">
//               <GoogleMap />
//             </div>
//           </div>
//         </>
//       ) : (
//         <>
//           <p className="text-gray-400 text-sm text-center">8h 32m 43s</p>
//           <div className="mb-2" />
//           <button
//             onClick={() => setIsPlaying(!isPlaying)}
//             className="text-xl text-green-600 font-medium border-2 rounded-lg py-2 px-2 w-60"
//           >
//             start game ✓
//           </button>
//         </>
//       )}
//     </>
//   );
// };

export default Game;
