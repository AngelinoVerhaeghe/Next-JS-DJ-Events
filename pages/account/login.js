import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import AuthContext from "@/context/AuthContext";

export default function LoginPage() {
  /* State first only have email and password */
  const [email, setEmail] = useState(""); // Set State to empty
  const [password, setPassword] = useState(""); // Set State to empty

  /* // ! Here we need the login and error if there is any from AuthContext file */
  const { login, error } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    /* // ! login function from authcontext with email and password on login page */
    login({ email, password });
  };

  return (
    <Layout title="Dj Events | Login">
      <div className="max-w-sm lg:max-w-lg bg-white rounded-lg shadow-lg mx-auto p-6">
        <h1 className="text-2xl text-gray-700 flex items-center justify-between mb-6">
          Login
          <FaUser className="mr-2 text-purple-700" />
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit} className="grid grid-cols-1">
          {/* Set value attribute for useState and onChange*/}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email Address
            </label>
            <input
              className="bg-white border border-gray-100 rounded-lg shadow-md text-gray-600 caret-gray-600 w-full mb-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Set value attribute for useState and onChange*/}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              className="bg-white border border-gray-100 rounded-lg shadow-md text-gray-600 caret-gray-600 w-full focus:outline-none focus:ring-1 focus:ring-purple-500"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              type="submit"
              value="Login"
              className="w-full bg-purple-700 text-purple-100 rounded-lg shadow-md py-2 px-4 hover:bg-purple-600 cursor-pointer transition ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 mt-6"
            />
          </div>
        </form>

        <p className="text-sm text-gray-700 mt-4">
          Don't have an account?
          <span className="underline ml-2 text-purple-500">
            <Link href="/account/register">Register</Link>
          </span>
        </p>
      </div>
    </Layout>
  );
}
