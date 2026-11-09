const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm p-6 bg-white border border-gray-300 rounded-md">

        <h1 className=" text-center text-3xl tracking-[1px] font-bold text-black-600 mb-1">
          EventBook
        </h1>

        <p className=" text-center text-xs text-gray-400 mt-1 mb-6">
          Sign in to your account
        </p>

        <form>
          <div className="mb-4">
            <label className=" text-black block text-xs font-bold text-left mb-1">
              Email
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded px-2 py-2 text-xs outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className=" text-left text-black block text-xs font-bold mb-1">
              Password
            </label>

            <input
              type="password"
              placeholder="********"
              className="w-full border border-gray-300 rounded px-2 py-2 text-xs outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 rounded"
          >
            Login
          </button>
        </form>

        <p className="text-center text-xs text-blue-600 mt-4">
          No account? <a href="/register">Register</a>
        </p>

      </div>
    </div>
  );
};

export default Login;
