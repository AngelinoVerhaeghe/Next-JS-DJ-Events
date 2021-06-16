import Link from "next/link";
import Image from "next/image";

function EventItem({ event }) {
  return (
    <div className="bg-white flex items-center justify-between shadow-xl my-5 p-6 rounded-lg">
      <div className="flex items-center">
        <Image
          src={
            event.image
              ? event.image.formats.thumbnail.url
              : "/images/event-default.png"
          }
          width={170}
          height={100}
        />
      </div>
      <div>
        <span className="text-sm text-gray-400">
          {new Date(event.date).toLocaleDateString("en-US")} at {event.time}
        </span>
        <h3 className="font-bold">{event.name}</h3>
      </div>

      <div>
        <Link href={`/events/${event.slug}`}>
          <a className="py-2 px-4 bg-indigo-500 rounded-lg text-white font-medium hover:bg-indigo-700 transition duration-200 ease-in-out">
            Details
          </a>
        </Link>
      </div>
    </div>
  );
}

export default EventItem;
