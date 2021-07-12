import Link from "next/link";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";

function Header() {
  // Here now we destructure whenever we want out AuthContext
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="container mx-auto flex items-center justify-between py-6 px-2 lg:px-0">
      <div>
        <Link href="/">
          <a className="font-medium text-xl bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text uppercase transition duration-200 ease-in-out">
            DJ Events
          </a>
        </Link>
      </div>

      <nav>
        <ul className="flex items-center space-x-6">
          <li className="text-gray-600 font-medium hover:text-purple-600 transition ease-in-out">
            <Link href="/events">
              <a>Events</a>
            </Link>
          </li>
          {/* // ! Only show add event when there is a user logged in -> if user, else show login */}
          {user ? (
            <>
              {/* // if logged in */}
              <li className="text-gray-600 font-medium hover:text-purple-600 transition ease-in-out">
                <Link href="/events/add">
                  <a>Create Event</a>
                </Link>
              </li>
              <li className="text-gray-600 font-medium hover:text-purple-600 transition ease-in-out">
                <Link href="/account/dashboard">
                  <a>Dashboard</a>
                </Link>
              </li>
              <li className="bg-indigo-500 text-indigo-50 py-2 px-4 rounded-lg hover:bg-indigo-600 transition ease-in-out">
                {/* // ! call logout function out of AuthContext file */}
                <a onClick={() => logout()} className="flex items-center">
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </a>
              </li>
            </>
          ) : (
            <>
              {/* if logged out */}
              <li className="bg-indigo-500 text-indigo-50 py-2 px-4 rounded-lg hover:bg-indigo-600 transition ease-in-out">
                <Link href="/account/login">
                  <a className="flex items-center">
                    <FaSignInAlt className="mr-2" />
                    Login
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
