import { useState } from "react";
import { useRouter } from "next/router";
import { FaSearch } from "react-icons/fa";

export default function Search() {
  const [term, setTerm] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Redirect page to ... search page with router*/
    router.push(`/events/search?term=${term}`);
    setTerm("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center relative px-2 lg-px-0">
          <div className="absolute text-gray-700 px-2">
            <FaSearch />
          </div>
          <input
            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-full sm:text-sm 
          border-gray-300 shadow-sm pl-8"
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search"
          />
        </div>
      </form>
    </div>
  );
}
