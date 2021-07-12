import Link from "next/link";
import Image from "next/image";

function EventItem({ event }) {
  return (
    <div className="text-center pb-8">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden relative">
        <Image
          src={
            event.image
              ? event.image.formats.medium.url
              : "/images/event-default.png"
          }
          width={750}
          height={500}
          layout="responsive"
          objectFit
        />
        <div className="p-6">
          <div className="space-y-3">
            <span className="text-sm text-gray-700 font-base">
              {new Date(event.date).toLocaleDateString("en-US")} at {event.time}
            </span>
            <h3 className="text-md text-gray-900 font-bold">{event.name}</h3>
            <blockquote className="text-xs text-gray-400">
              Created by {event.user.username}
            </blockquote>
          </div>
          <span className="bg-indigo-300 text-xs font-bold text-indigo-700 rounded-full py-1 px-3 absolute top-4 left-4">
            {event.venue}
          </span>
          <div className="pt-5">
            <Link href={`/events/${event.slug}`}>
              <a className="py-2 px-4 block bg-indigo-500 rounded-lg text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring ring-indigo-400 ring-offset-2 transition duration-200 ease-in-out">
                Details
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventItem;
