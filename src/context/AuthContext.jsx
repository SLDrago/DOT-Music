import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

// Create the AuthContext
const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  // Function to encrypt data
  const encryptData = (data) => {
    return CryptoJS.AES.encrypt(data, "your-secret-key").toString();
  };

  // Function to decrypt data
  const decryptData = (data) => {
    const bytes = CryptoJS.AES.decrypt(data, "your-secret-key");
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  // Load user and token from cookies on initial render
  useEffect(() => {
    const savedToken = Cookies.get("authToken");
    const savedUser = Cookies.get("user");

    if (savedToken && savedUser) {
      setToken(decryptData(savedToken));
      setUser(JSON.parse(decryptData(savedUser)));
    }
  }, []);

  // Function to update user details
  const updateUser = (user) => {
    setUser(user);
    Cookies.set("user", encryptData(JSON.stringify(user)), {
      secure: true,
      expires: 7,
    });
  };

  // Function to log in a user
  const login = (token, user) => {
    setToken(token);
    setUser(user);
    Cookies.set("authToken", encryptData(token), { secure: true, expires: 7 });
    Cookies.set("user", encryptData(JSON.stringify(user)), {
      secure: true,
      expires: 7,
    });
  };

  // Function to log out the user
  const logout = async () => {
    if (token) {
      await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    }
    setToken(null);
    setUser(null);
    Cookies.remove("authToken");
    Cookies.remove("user");
    navigate("/signin");
  };

  // Provide the AuthContext values
  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// PropTypes validation for AuthProvider
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
