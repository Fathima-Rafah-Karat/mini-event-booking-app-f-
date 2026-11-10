import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { registerUser } from "../api/auth/register";


const inputClass =
  "w-full border border-gray-300 rounded px-2 py-2 text-xs outline-none focus:border-blue-500";
const labelClass = "block text-left text-xs font-bold text-black mb-1";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      const data = await registerUser({ email, password });

      const token = data?.token;

      if (token) {
        localStorage.setItem("token", token);
      }

      toast.success("Account created successfully!");
      navigate("/event");

    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error(error);
     } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm p-6 bg-white border border-gray-300 rounded-md">

        <h1 className=" text-center text-3xl tracking-[1px] font-bold text-black-600 mb-1">
          EventBook
        </h1>

        <p className=" text-center text-xs text-gray-400 mt-1 mb-6">
          Sign up to your account
        </p>

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className={labelClass}>
              Email
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputClass}
            />
          </div>

          <div className="mb-4">
            <label className={labelClass}>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 rounded"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-xs text-blue-600 mt-4">
          Already have an account?{" "}
          <Link to="/" className="hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
