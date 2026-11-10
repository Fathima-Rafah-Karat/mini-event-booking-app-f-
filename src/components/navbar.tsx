const Navbar = () => {
  return (
    <nav className="flex min-h-10 items-center justify-between bg-slate-800 px-5 py-2 text-white">

      <h2 className=" text-white text-base font-bold tracking-[1px] ">
        EventBook
      </h2>

      <div className="flex items-center gap-4 text-xs">
        <a href="#events" className="hover:text-blue-300">Events</a>
        <a href="#bookings" className="hover:text-blue-300">My Bookings</a>
        <a href="#admin" className="hover:text-blue-300">Admin</a>
        <a href="#logout" className="hover:text-blue-300">Logout</a>
      </div>

    </nav>
  );
};

export default Navbar;
