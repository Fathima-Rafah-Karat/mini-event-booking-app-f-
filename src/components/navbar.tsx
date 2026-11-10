import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { headers: { Authorization: `Bearer ${token ?? ""}` } }
      );
      toast.success("Logged out successfully.");
    } catch (error) {
      console.error("Logout request failed:", error);
      toast.error("Logged out on this device.");
    } finally {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <nav className="flex min-h-10 items-center justify-between bg-slate-800 px-5 py-2 text-white">

      <h2 className=" text-white text-base font-bold tracking-[1px] ">
        EventBook
      </h2>

      <div className="flex items-center gap-4 text-xs">
        <Link to="/event" className="hover:text-blue-300">Events</Link>
        <Link to="/mybookings" className="hover:text-blue-300">My Bookings</Link>
        <Link to="/create-event" className="hover:text-blue-300">Admin</Link>
        <button
          type="button"
          onClick={handleLogout}
          className="hover:text-blue-300"
        >
          Logout
        </button>
      </div>

    </nav>
  );
};

export default Navbar;
