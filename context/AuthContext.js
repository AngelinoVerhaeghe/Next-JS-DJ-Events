// Everywhere we need authentication now we need to import that in the component!!!

import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { API_URL } from "@/config/index";

// Create a Context make variable
const AuthContext = createContext();

// Provider thas wrap on the whole website {children} to give information to pages: like props etc..
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Register user -> user object inside ()
  const register = async (user) => {
    console.log(user);
  };
  // Login user -> dustructure to email and password, but with strapi backend email is called identifier so we need to set that with a : after email
  const login = async ({ email: identifier, password }) => {
    console.log({ indentifier, password });
  };
  // Logout user show string in console with message logged out
  const logout = async () => {
    console.log("Logged out!");
  };

  // Check if user is logged in
  const checkUserLoggedIn = async (user) => {
    console.log("Check!");
  };

  // Now we need to return the AuthContentProvider with some value as object {{}}

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Now we need to export AuthContext to the main app.js so we get access to all info
export default AuthContext;
