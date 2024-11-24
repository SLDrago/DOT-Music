import { useState } from "react";
import Logo from "../../images/logos/Logo.svg";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [error, setError] = useState("");

  const handleNext = (e) => {
    e.preventDefault();

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(
        "This email is invalid. Make sure it's written like example@email.com"
      );
    } else {
      setError("");
      alert("Proceeding to the next step!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center">
          <img src={Logo} alt="DOT-Music Logo" className="h-12 mx-auto mb-4" />
          <h1 className="text-white text-2xl font-semibold mb-2">
            Sign up to start listening
          </h1>
        </div>
        <form onSubmit={handleNext} className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-1" htmlFor="email">
              Email address
            </label>
            <input
              type="text"
              id="email"
              className={`w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none ${
                error
                  ? "border-red-500 border-4"
                  : "focus:ring-2 focus:ring-orange-500"
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@domain.com"
            />
            {error && (
              <p className="text-red-500 text-xs mt-1">
                <span className="mr-1">⚠️</span>
                {error}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-1" htmlFor="email">
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-orange-500`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-1" htmlFor="email">
              Confirm Password
            </label>
            <input
              type="password"
              id="confPassword"
              className={`w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-orange-500`}
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
              placeholder="Confirm Password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-medium py-2 rounded hover:bg-orange-600"
          >
            Create Account
          </button>
        </form>
        <div className="mt-6 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <NavLink to="/signin" className="text-orange-500 hover:underline">
            Log in here
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
