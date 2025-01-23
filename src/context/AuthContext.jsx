import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(undefined);

const encryptData = (data) => {
  try {
    const stringData = typeof data === "string" ? data : JSON.stringify(data);
    return CryptoJS.AES.encrypt(stringData, "your-secret-key").toString();
  } catch (error) {
    console.error("Error during encryption:", error);
    return null;
  }
};

const decryptData = (data) => {
  try {
    const bytes = CryptoJS.AES.decrypt(data, "your-secret-key");
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

    // Attempt to parse JSON if applicable
    try {
      return JSON.parse(decryptedString);
    } catch {
      return decryptedString; // Return as string if not JSON
    }
  } catch (error) {
    console.error("Error during decryption:", error);
    return null;
  }
};

// Function to store token and user in cookies
const storeAuthData = (token, user) => {
  Cookies.set("authToken", encryptData(token), { secure: true, expires: 7 });
  Cookies.set("user", encryptData(JSON.stringify(user)), {
    secure: true,
    expires: 7,
  });
};

// Function to read token and user from cookies
const readAuthData = () => {
  const savedToken = Cookies.get("authToken");
  const savedUser = Cookies.get("user");

  if (savedToken && savedUser) {
    return {
      token: decryptData(savedToken),
      user: decryptData(savedUser),
    };
  }
  return { token: null, user: null };
};

// Function to clear cookies
const clearAuthData = () => {
  Cookies.remove("authToken");
  Cookies.remove("user");
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const { token: savedToken, user: savedUser } = readAuthData();
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(savedUser);
    }
  }, []);

  const login = (token, user) => {
    if (!token || !user) {
      console.error("Invalid token or user data provided to login.");
      return;
    }
    setToken(token);
    setUser(user);
    storeAuthData(token, user);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    clearAuthData();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
