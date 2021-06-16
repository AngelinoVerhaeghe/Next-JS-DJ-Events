import Link from "next/link";
import Search from "./Search";

function Header() {
  return (
    <header className="py-6 text-gray-700 font-medium shadow-md">
      <div className="flex items-center container justify-between mx-auto bg-white">
        <div>
          <Link href="/">
            <a className="text-red-500 uppercase hover:text-red-700 transition duration-200 ease-in-out">
              DJ Events
            </a>
          </Link>
        </div>

        <Search />

        <nav>
          <ul className="flex items-center space-x-4">
            <li>
              <Link href="/events">
                <a>Events</a>
              </Link>
            </li>
            <li>
              <Link href="/events/add">
                <a>Add Event</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
