import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom"; // Import useNavigate for redirection
import api from "../../components/Artist/api"; // Import your axios instance
import background from "../../images/logos/Logo.svg";
import logo from "../../images/logos/Logo.svg";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; // Import eye icons for toggle

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate(); // Use navigate for redirection

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Attempting login with credentials:", { email, password });
      const response = await api.post("artist/login/", { email, password });

      // Store the token and other details in state and localStorage
      // Extract the tokens and artist data from the response
      const { access_token, refresh_token, artist } = response.data;

      localStorage.setItem("authToken", access_token); // Store access token in localStorage
      localStorage.setItem("refreshToken", refresh_token); // Store refresh token in localStorage
      localStorage.setItem("username", artist.name);
      localStorage.setItem("artistId", artist.id); // Save artist ID to localStorage

      console.log("Login successful, redirecting...");
      navigate("/ArtistAdminPanel/home"); // Redirect to the homepage after successful login
    } catch (err) {
      console.error("Login error: ", err.response || err);
      if (err.response && err.response.data) {
        setError(err.response.data.detail || "Invalid credentials"); // Display error message from response
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-row">
      {/* Left Side Image */}
      <div className="w-full sm:w-1/2 h-screen flex justify-center items-center">
        <img
          alt="Background"
          src={background}
          className="object-cover h-full w-full"
        />
      </div>

      {/* Right Side Form */}
      <div className="w-full sm:w-1/2 flex justify-center items-center px-6 py-12 sm:px-8">
        <div className="sm:w-full sm:max-w-sm">
          {/* Logo and Text Section */}
          <div className="flex flex-col items-center space-y-4 mb-8">
            <img src={logo} alt="Logo" className="h-16 w-16" />{" "}
            {/* Adjust size */}
            <span className="text-3xl font-semibold text-gray-900">
              DOT-Music
            </span>
          </div>

          <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <form onSubmit={handleLogin} className="space-y-6 mt-8">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"} // Toggle between text and password
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                />
                {/* Eye Icon to toggle password visibility */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <EyeIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div>
              <button
                type="submit"
                className="w-full rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <NavLink
              to="/ArtistAdminPanel/register"
              className="font-semibold text-orange-500 hover:text-orange-600"
            >
              Register here
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
