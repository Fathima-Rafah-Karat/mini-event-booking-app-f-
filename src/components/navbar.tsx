import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { logoutUser } from "../api/auth/logout";

const Navbar = () => {
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

      try {
      await logoutUser();
      toast.success("Logged out successfully.");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logged out on this device.");
    } finally {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <>
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
            onClick={() => setShowLogoutDialog(true)}
            className="hover:text-blue-300"
          >
            Logout
          </button>
        </div>

      </nav>

      {showLogoutDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowLogoutDialog(false);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-dialog-title"
            className="w-full max-w-sm rounded-lg bg-white p-6 text-slate-800 shadow-xl"
          >
            <h2 id="logout-dialog-title" className="text-lg font-bold">
              Logout
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Are you sure you want to logout of your account?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowLogoutDialog(false)}
                className="rounded border border-slate-300 px-4 py-2 text-sm hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
              >
                Logout
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Navbar;
