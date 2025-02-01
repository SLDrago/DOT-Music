// src/components/Register.js
import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom"; // Import useNavigate for redirection
import api from "../../components/Artist/api"; // Import the axios instance
import background from "../../images/logos/Logo.svg"; // Background image
import logo from "../../images/logos/Logo.svg"; // Logo image (adjust the path as needed)

const AdminRegister = () => {
  const navigate = useNavigate(); // Initialize navigate for redirecting
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [artistType, setArtistType] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Hardcoded artist types
  const ARTIST_TYPES = [
    { value: "pop", label: "Pop" },
    { value: "rock", label: "Rock" },
    { value: "hip_hop", label: "Hip-Hop" },
    { value: "jazz", label: "Jazz" },
    { value: "classical", label: "Classical" },
    { value: "reggae", label: "Reggae" },
    { value: "electronic", label: "Electronic" },
    { value: "country", label: "Country" },
    { value: "blues", label: "Blues" },
    { value: "metal", label: "Metal" },
    // Add other genres as needed
  ];

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    try {
      const response = await api.post("artist/register/", {
        username,
        password,
        email,
        bio,
        artist_type: artistType,
      });

      // Extract the tokens and artist data from the response
      const { access_token, refresh_token, artist } = response.data;

      localStorage.setItem("authToken", access_token); // Store access token in localStorage
      localStorage.setItem("refreshToken", refresh_token); // Store refresh token in localStorage

      // Store the artist data (for example, you can store it in the state or pass it to a parent component)
      localStorage.setItem("username", artist.name); // Assuming you have a setArtist function or similar to update state

      setSuccess(true);

      // Redirect to login after a successful registration
      setTimeout(() => {
        navigate("/ArtistAdminPanel/home"); // Redirect to login page
      }, 2000); // Redirect after 2 seconds for user experience
    } catch (err) {
      setError(err.response?.data?.error || "Error during registration");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side Form */}
      <div className="w-full sm:w-1/2 h-screen flex justify-center items-center px-6 py-12 sm:px-8">
        <div className="sm:w-full sm:max-w-sm space-y-6">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src={logo} alt="Logo" className="h-12" />
          </div>

          <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
            Register to your account
          </h2>
          <form onSubmit={handleRegister} className="space-y-4 mt-8">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
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
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
            </div>

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
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-900"
              >
                Bio
              </label>
              <div className="mt-2">
                <input
                  id="bio"
                  name="bio"
                  type="text"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="artistType"
                className="block text-sm font-medium text-gray-900"
              >
                Artist Type
              </label>
              <div className="mt-2">
                <select
                  id="artistType"
                  name="artistType"
                  value={artistType}
                  onChange={(e) => setArtistType(e.target.value)}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                >
                  <option value="">Select Artist Type</option>
                  {ARTIST_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </form>

          {success && (
            <p className="text-green-500 text-sm mt-4">
              Registration successful! Redirecting...
            </p>
          )}
          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

          <p className="mt-4 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <NavLink
              to="/ArtistAdminPanel/login"
              className="font-semibold text-orange-500 hover:text-orange-600"
            >
              Login here
            </NavLink>
          </p>
        </div>
      </div>

      {/* Right Side Background Image */}
      <div className="w-full sm:w-1/2 h-screen flex justify-center items-center">
        <img
          alt="Background"
          src={background}
          className="object-cover h-full w-full"
        />
      </div>
    </div>
  );
};

export default AdminRegister;
