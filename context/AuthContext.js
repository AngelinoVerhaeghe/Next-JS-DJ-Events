// Everywhere we need authentication now we need to import that in the component!!!

import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "@/config/index";

// Create a Context make variable
const AuthContext = createContext();

// Provider thas wrap on the whole website {children} to give information to pages: like props etc..
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  // Active if the page loads
  useEffect(() => checkUserLoggedIn(), []);

  // Register user -> user object inside ()
  const register = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    // data variable is the response
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      // if user login return them to the dashboard page with router.push()
      router.push("/account/dashboard");
    } else {
      setError(data.message);
      // Remove error out of state
      setError(null);
    }
  };
  // Login user -> dustructure to email and password, but with strapi backend email is called identifier so we need to set that with a : after email
  const login = async ({ email: identifier, password }) => {
    // API Call to api/login.js
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    // data variable is the response
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      // if user login return them to the dashboard page with router.push()
      router.push("/account/dashboard");
    } else {
      setError(data.message);
      // Remove error out of state
      setError(null);
    }
  };
  // Logout user
  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: "POST",
    });

    if (res.ok) {
      // ste user to null
      setUser(null);
      // return to homepage
      router.push("/");
    }
  };

  // Check if user is logged in
  const checkUserLoggedIn = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
    } else {
      setUser(null);
    }
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
