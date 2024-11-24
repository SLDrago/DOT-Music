import Logo from "../../images/logos/Logo.svg";
import { NavLink } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center items-center mb-6">
          <img src={Logo} alt="logo" className="w-20 h-20" />
        </div>
        <h1 className="text-white text-2xl font-semibold text-center mb-6">
          Log in to DOT-Music
        </h1>
        <form className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-1" htmlFor="email">
              Email or username
            </label>
            <input
              type="text"
              id="email"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:ring-2 focus:ring-orange-500 focus:outline-none"
              placeholder="Email or username"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-400 text-sm mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:ring-2 focus:ring-orange-500 focus:outline-none"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-medium py-2 rounded hover:bg-orange-600"
          >
            Log In
          </button>
        </form>
        <div className="mt-4 text-center">
          <NavLink
            to="/reset-password"
            className="text-orange-500 text-sm hover:underline"
          >
            Forgot your password?
          </NavLink>
        </div>
        <div className="mt-6 text-center text-gray-400 text-sm">
          Don't have an account?{" "}
          <NavLink to="/signup" className="text-orange-500 hover:underline">
            Sign up for DOT-Music
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
