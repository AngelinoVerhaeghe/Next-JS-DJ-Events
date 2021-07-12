import { HiUserAdd } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { IconContext } from "react-icons";
import AuthContext from "@/context/AuthContext";

export default function RegisterPage() {
  /* State first only have username, email and password */
  const [username, setUsername] = useState(""); // Set State to empty
  const [email, setEmail] = useState(""); // Set State to empty
  const [password, setPassword] = useState(""); // Set State to empty
  const [passwordConfirm, setPasswordConfirm] = useState(""); // Set State to empty

  /* // ! Here we need register and error if there is any from AuthContext file */
  const { register, error } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    /* Error toast if password does not match */
    if (password !== passwordConfirm) {
      toast.error("Passwords do not match!");
      return;
    }
    // ! register function from authcontext with username, email and password on register page
    register({ username, email, password });
  };

  return (
    <Layout title="Dj Events | Registration">
      <div className="max-w-sm lg:max-w-lg bg-white rounded-lg shadow-lg mx-auto p-6">
        <h1 className="text-2xl text-gray-700 flex items-center justify-between mb-6">
          Register
          {/* IconContext.Provider for styling the icon dont forget to import IconContext to above */}
          <IconContext.Provider value={{ size: "1em" }}>
            <HiUserAdd className="mr-2 text-purple-700" />
          </IconContext.Provider>
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit} className="grid grid-cols-1">
          {/* Set value attribute for useState and onChange*/}
          <div>
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              className="bg-white border border-gray-100 rounded-lg shadow-md text-gray-600 caret-gray-600 w-full mb-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

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
              className="bg-white border border-gray-100 rounded-lg shadow-md text-gray-600 caret-gray-600 w-full focus:outline-none focus:ring-1 focus:ring-purple-500 mb-2"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Set value attribute for useState and onChange*/}
          <div>
            <label
              htmlFor="passwordConfirm"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Confirm Password
            </label>
            <input
              className="bg-white border border-gray-100 rounded-lg shadow-md text-gray-600 caret-gray-600 w-full focus:outline-none focus:ring-1 focus:ring-purple-500"
              type="password"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>

          <div>
            <input
              type="submit"
              value="Register"
              className="w-full bg-purple-700 text-purple-100 rounded-lg shadow-md py-2 px-4 hover:bg-purple-600 cursor-pointer transition ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 mt-6"
            />
          </div>
        </form>

        <p className="text-sm text-gray-700 mt-4">
          Already have an account?
          <span className="underline ml-2 text-purple-500">
            <Link href="/account/login">Login</Link>
          </span>
        </p>
      </div>
    </Layout>
  );
}
