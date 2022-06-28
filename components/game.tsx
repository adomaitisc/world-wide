import { ReactNode, Ref, useRef, useState } from "react";
import Button from "./button";
import GoogleMap from "./google-map";
import GoogleStreet from "./google-street";

type ActionProps = {
  hasGuessed: boolean;
  onPlay: any;
  onPlayAgain: any;
};

type GameProps = {
  onGuess: any;
  location: {
    lat: number;
    lng: number;
  };
};

const Game = () => {
  const coordinateList = [
    {
      lat: -23.5507,
      lng: -47.12362,
    },
    {
      lat: -23.52585,
      lng: -47.13177,
    },
  ];

  const location = coordinateList[0];

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasGuessed, setHasGuessed] = useState(false);
  const [guess, setGuess] = useState([]);

  const onPlay = () => {
    setIsPlaying(true);
  };

  const onPlayAgain = () => {
    setIsPlaying(false);
    setHasGuessed(false);
    setGuess([]);
  };

  const onGuess = (e: any) => {
    console.log(e);
    setIsPlaying(false);
    setGuess(e);
    setHasGuessed(true);
    alert(
      `You guessed: ${e}, Correct answer is: ${location.lat}, ${location.lng}`
    );
  };

  /**
   * if 'not playing', show ActionInterface
   *  ActionInterface Component:
   *    displays:
   *      - play button
   *      - game summary
   *    what it does:
   *      - set state of 'playing' to true
   *      @dev
   *      - set state of 'playing' to false
   *
   * if 'playing', show GameInterface
   *  GameInterface Component:
   *    displays:
   *      - google streetview
   *      - google map
   *      - guess button
   *    what it does:
   *      - set state of 'playing' to false
   *      - set state of 'guessed' to true
   *      - set state of 'guess' to selected latitude and longitude
   */

  return (
    <>
      {!isPlaying ? (
        <ActionInterface
          hasGuessed={hasGuessed}
          onPlay={onPlay}
          onPlayAgain={onPlayAgain}
        />
      ) : (
        <GameInterface onGuess={onGuess} location={location} />
      )}
    </>
  );
};

const ActionInterface: React.FC<ActionProps> = ({
  hasGuessed,
  onPlay,
  onPlayAgain,
}) => {
  return (
    <>
      {!hasGuessed ? (
        <Button
          primary
          action={() => {
            onPlay();
          }}
          title="Play"
        />
      ) : (
        <>
          <h1>Game Summary</h1>
          <Button
            action={() => {
              onPlayAgain();
            }}
            title="Play Again"
          />
        </>
      )}
    </>
  );
};

const GameInterface: React.FC<GameProps> = ({ onGuess, location }) => {
  const [guess, setGuess] = useState([]);

  const onCoordsChange = (e: any) => {
    setGuess(e);
  };

  const handleGuess = () => {
    if (guess.length === 2) {
      onGuess(guess);
      setGuess([]);
    } else {
      //Does something if guess is empty
      alert("Please select a location");
    }
  };

  return (
    <>
      <Button
        primary
        action={() => {
          handleGuess();
        }}
        title="Guess"
      />
      <div className="mb-4" />
      <div className="w-full h-full relative">
        <GoogleStreet location={location} />
        <div className="absolute right-0 bottom-0 w-1/5 h-1/5 z-10 opacity-60 hover:w-2/5 hover:h-2/5 hover:opacity-100 transition-all duration-300 rounded-xl">
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
