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

    try {
      return JSON.parse(decryptedString);
    } catch {
      return decryptedString;
    }
  } catch (error) {
    console.error("Error during decryption:", error);
    return null;
  }
};

const storeAuthData = (token, user, refreshToken) => {
  Cookies.set("authToken", encryptData(token), { secure: true, expires: 1 });
  Cookies.set("user", encryptData(JSON.stringify(user)), {
    secure: true,
    expires: 7,
  });
  Cookies.set("refreshToken", encryptData(refreshToken), {
    secure: true,
    expires: 7,
  });
};

const readAuthData = () => {
  const savedToken = Cookies.get("authToken");
  const savedUser = Cookies.get("user");
  const savedRefreshToken = Cookies.get("refreshToken");

  if (savedToken && savedUser && savedRefreshToken) {
    return {
      token: decryptData(savedToken),
      user: decryptData(savedUser),
      refreshToken: decryptData(savedRefreshToken),
    };
  }
  return { token: null, user: null, refreshToken: null };
};

const clearAuthData = () => {
  Cookies.remove("authToken");
  Cookies.remove("user");
  Cookies.remove("refreshToken");
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  useEffect(() => {
    const {
      token: savedToken,
      user: savedUser,
      refreshToken: savedRefreshToken,
    } = readAuthData();
    if (savedToken && savedUser && savedRefreshToken) {
      setToken(savedToken);
      setUser(savedUser);
      setRefreshToken(savedRefreshToken);
    }
  }, []);

  const login = (token, user, refreshToken) => {
    if (!token || !user || !refreshToken) {
      console.error("Invalid token or user data provided to login.");
      return;
    }
    setToken(token);
    setUser(user);
    setRefreshToken(refreshToken);
    storeAuthData(token, user, refreshToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setRefreshToken(null);
    clearAuthData();
  };

  return (
    <AuthContext.Provider value={{ user, token, refreshToken, login, logout }}>
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
