import { useState, useEffect } from "react";
import Logo from "../../images/logos/Logo.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const RESET_PASSWORD_ENDPOINT = `${API_BASE_URL}/reset-password`;

const ResetPassword = () => {
  const [errors, setErrors] = useState("");
  const [email, setEmail] = useState("");
  const { token } = useAuth();
  const [message, setMessage] = useState("");

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

    setErrors(newErrors);
  }, [email, touched]);

  const handleSendLink = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).length > 0) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    try {
      await toast.promise(
        axios.post(RESET_PASSWORD_ENDPOINT, { email: email }),
        {
          pending: "Sending reset link...",
          success: "Password reset link sent successfully!",
          error: "Failed to send reset link. Please try again.",
        }
      );
      setMessage("A password reset link has been sent to your email.");
    } catch (error) {
      console.error(
        "Error sending reset link:",
        error.response?.data || error.message
      );
      setMessage("Failed to send password reset link. Please try again.");
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
            Enter the email address linked to your DOT-Music account and we’ll
            send you an email.
          </p>
        </div>
        <form onSubmit={handleSendLink} className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-1" htmlFor="email">
              Email Address
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
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-medium py-2 rounded hover:bg-orange-600"
            disabled={Object.keys(errors).length > 0}
          >
            Send link
          </button>
        </form>
        {message && (
          <p className="text-center text-gray-400 text-sm mt-4">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
