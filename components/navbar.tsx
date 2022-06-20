const Navbar = () => {
  return (
    <div className="flex flex-row w-full justify-between">
      <p className="text-green-800 font-semibold"> scores</p>
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-green-800 text-center">
          world wide
        </h1>
        <p className="text-gray-400 text-sm text-center">
          next game in 8h 32m 43s
        </p>
      </div>
      <p className="text-green-800 font-semibold">settings</p>
    </div>
  );
};

export default Navbar;
