import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(undefined);

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(data, "your-secret-key").toString();
};

const decryptData = (data) => {
  const bytes = CryptoJS.AES.decrypt(data, "your-secret-key");
  return bytes.toString(CryptoJS.enc.Utf8);
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
      user: JSON.parse(decryptData(savedUser)),
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
