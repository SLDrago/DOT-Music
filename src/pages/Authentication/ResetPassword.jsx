import { useState, useEffect } from "react";
import Logo from "../../images/logos/Logo.svg";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const RESET_PASSWORD_ENDPOINT = `${API_BASE_URL}/users/reset-password/`;

const ResetPassword = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const uid = queryParams.get("uid");
  const token = queryParams.get("token");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !uid) {
      toast.error("Invalid or expired link.");
      navigate("/signin");
    }
  }, [token, uid, navigate]);

  useEffect(() => {
    const newErrors = {};

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
  }, [password, confPassword, touched]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).length > 0) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    try {
      const response = await toast.promise(
        axios.post(RESET_PASSWORD_ENDPOINT, { uid, token, password }),
        {
          pending: "Resetting password...",
          success: "Password reset successful!",
          error: "Password reset failed. Please try again.",
        }
      );

      const { message } = response.data;
      toast.success(message);
      navigate("/signin");
    } catch (error) {
      console.error(
        "Error during password reset:",
        error.response?.data || error.message
      );
      toast.error("Failed to reset password. Please try again.");
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
            Reset your password
          </h1>
          <p className="text-gray-400 text-sm">
            We Gotcha covered! Enter your new password below.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label
              className="block text-gray-400 text-sm mb-1"
              htmlFor="password"
            >
              New Password
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
              placeholder="Enter new password"
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
              placeholder="Confirm new password"
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
            Reset Password
          </button>
        </form>
        <div className="mt-6 text-center text-gray-400 text-sm">
          Remembered your password?{" "}
          <NavLink to="/signin" className="text-orange-500 hover:underline">
            Log in here
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
