const Navbar = () => {
  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        Dashboard
      </h1>

      <button className="bg-black text-white px-4 py-2 rounded-lg">
        Logout
      </button>
    </div>
  );
};

export default Navbar;