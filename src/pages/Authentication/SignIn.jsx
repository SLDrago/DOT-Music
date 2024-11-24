import Logo from "../../images/logos/Logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const LOGIN_ENDPOINT = `${API_BASE_URL}/login`;

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { login, token } = useAuth();
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    const newErrors = {};

    if (touched.email) {
      if (!email) {
        newErrors.email = "Email is required.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = "Invalid email format.";
      }
    }
    if (touched.password) {
      if (!password) {
        newErrors.password = "Password is required.";
      } else if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters long.";
      }
    }
    setErrors(newErrors);
  }, [email, password, touched]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).length > 0) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    try {
      const response = await toast.promise(
        axios.post(LOGIN_ENDPOINT, { email, password }),
        {
          pending: "Logging in...",
          success: "Login successful!",
          error: "Login failed. Please check your credentials.",
        }
      );

      console.log("Response:", response.data);
      const { token, user } = response.data;
      login(token, user);
      navigate("/");
    } catch (error) {
      console.error(
        "Error during login:",
        error.response?.data || error.message
      );
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center items-center mb-6">
          <img src={Logo} alt="logo" className="w-20 h-20" />
        </div>
        <h1 className="text-white text-2xl font-semibold text-center mb-6">
          Log in to DOT-Music
        </h1>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              id="email"
              className={`w-full px-4 py-2 bg-gray-800 text-white rounded focus:ring-2 focus:ring-orange-500 focus:outline-none ${
                errors.email ? "border-red-500 border-2" : ""
              }`}
              placeholder="Email"
              onBlur={() => handleBlur("email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
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
              className={`w-full px-4 py-2 bg-gray-800 text-white rounded focus:ring-2 focus:ring-orange-500 focus:outline-none ${
                errors.password ? "border-red-500 border-2" : ""
              }`}
              placeholder="Password"
              onBlur={() => handleBlur("password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-medium py-2 rounded hover:bg-orange-600"
            disabled={Object.keys(errors).length > 0}
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
          Don&apos;t have an account?{" "}
          <NavLink to="/signup" className="text-orange-500 hover:underline">
            Sign up for DOT-Music
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
