import { useState } from "react";
import Logo from "../../images/logos/Logo.svg";

const ResetPassword = () => {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  const handleSendLink = (e) => {
    e.preventDefault();

    if (!input) {
      setMessage("Please enter a valid email or username.");
    } else {
      setMessage("A password reset link has been sent (placeholder).");
    }
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
            <label
              className="block text-gray-400 text-sm mb-1"
              htmlFor="emailOrUsername"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-medium py-2 rounded hover:bg-orange-600"
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
