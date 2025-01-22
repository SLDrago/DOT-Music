import { useState, useEffect } from "react";
import Logo from "../../images/logos/Logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const SIGNUP_ENDPOINT = `${API_BASE_URL}/users/register/`;

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const { login, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    const newErrors = {};

    if (touched.name && !name) {
      newErrors.name = "Name is required.";
    }
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
    if (touched.confPassword) {
      if (!confPassword) {
        newErrors.confPassword = "Confirm Password is required.";
      } else if (password !== confPassword) {
        newErrors.confPassword = "Passwords do not match.";
      }
    }

    setErrors(newErrors);
  }, [name, email, password, confPassword, touched]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).length > 0) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    try {
      const response = await toast.promise(
        axios.post(SIGNUP_ENDPOINT, { name, email, password }),
        {
          pending: "Signing up...",
          success: "Signup successful!",
          error: "Signup failed. Please try again.",
        }
      );

      const { access_token, user } = response.data.user;
      login(access_token, user);
      navigate("/");
    } catch (error) {
      console.error(
        "Error during signup:",
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
        <div className="text-center">
          <img src={Logo} alt="DOT-Music Logo" className="h-12 mx-auto mb-4" />
          <h1 className="text-white text-2xl font-semibold mb-2">
            Sign up to start listening
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              className={`w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none ${
                errors.name
                  ? "border-red-500 border-2"
                  : "focus:ring-2 focus:ring-orange-500"
              }`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => handleBlur("name")}
              placeholder="Your Name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-1" htmlFor="email">
              Email address
            </label>
            <input
              type="text"
              id="email"
              className={`w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none ${
                errors.email
                  ? "border-red-500 border-2"
                  : "focus:ring-2 focus:ring-orange-500"
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur("email")}
              placeholder="name@domain.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-400 text-sm mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none ${
                errors.password
                  ? "border-red-500 border-2"
                  : "focus:ring-2 focus:ring-orange-500"
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur("password")}
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-400 text-sm mb-1"
              htmlFor="confPassword"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confPassword"
              className={`w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none ${
                errors.confPassword
                  ? "border-red-500 border-2"
                  : "focus:ring-2 focus:ring-orange-500"
              }`}
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
              onBlur={() => handleBlur("confPassword")}
              placeholder="Confirm Password"
            />
            {errors.confPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confPassword}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-medium py-2 rounded hover:bg-orange-600"
            disabled={Object.keys(errors).length > 0}
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
