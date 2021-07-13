import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";

export default function DashboardEvent({ event, handleDelete }) {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between bg-white rounded-lg shadow-lg p-6 mt-4">
      <h4 className="flex justify-center lg:justify-start">
        <Link href={`/events/${event.slug}`}>
          <a className="text-lg lg:text-2xl text-gray-800 font-medium">
            {event.name}
          </a>
        </Link>
      </h4>
      <div className="flex text-sm justify-center space-x-4 mt-3 lg:mt-0">
        <Link href={`/events/edit/${event.id}`}>
          <a className="flex items-center text-blue-600">
            <FaPencilAlt className="mr-2" />
            <span>Edit Event</span>
          </a>
        </Link>
        {/*  // ! onClick event to delete the event => passing in the id and above set the function as a prop*/}
        <a
          className="flex items-center text-red-600"
          onClick={() => handleDelete(event.id)}
        >
          <FaTimes className="mr-2" />
          Delete Event
        </a>
      </div>
    </div>
  );
}
