import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import Image from "next/image";
import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";

function EventPage({ event }) {
  const deleteEvent = (element) => {
    console.log("delete");
  };
  return (
    <Layout>
      <div className="space-y-2">
        <div className="flex items-cente space-x-3 justify-end">
          <Link href={`/events/edit/${event.id}`}>
            <a className="flex items-center text-blue-600">
              <FaPencilAlt className="mr-2" /> Edit Event
            </a>
          </Link>
          <a
            href="#"
            className="flex items-center text-red-600"
            onClick={deleteEvent}
          >
            <FaTimes className="mr-2" /> Delete Event
          </a>
        </div>
        <span className="text-sm text-gray-600">
          {new Date(event.date).toLocaleDateString("en-US")} at {event.time}
        </span>

        <h1 className="text-2xl font-bold">{event.name}</h1>

        {/* Look if the image exists */}
        {event.image && (
          <div>
            <Image
              src={event.image.formats.medium.url}
              width={960}
              height={600}
            />
          </div>
        )}

        <h3 className="font-bold tracking-wide">Performers:</h3>
        <p className="text-sm text-gray-600">{event.performers}</p>
        <h3 className="font-bold tracking-wide">Description:</h3>
        <p className="text-md text-gray-600">{event.description}</p>
        <h3 className="font-bold tracking-wide">Venue:</h3>
        <p className="text-sm text-gray-600">{event.address}</p>
        <div className="pt-7">
          <Link href="/events">
            <a className="py-2 px-4 bg-gray-600 rounded-lg text-white font-medium hover:bg-gray-800 transition duration-200 ease-in-out">
              Back
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default EventPage;

/* Server side */
/* export async function getServerSideProps({ query: { slug } }) {
  const response = await fetch(`${API_URL}/api/events/${slug}`);
  const events = await response.json();
  return {
    props: {
      event: events[0],
    },
  };
} */

export async function getStaticPaths() {
  /* Get All Data */
  const response = await fetch(`${API_URL}/events`);
  const events = await response.json();

  const paths = events.map((event) => ({
    params: { slug: event.slug },
  }));
  return {
    paths,
    fallback: true,
  };
}

/* Get properties at build time */
export async function getStaticProps({ params: { slug } }) {
  const response = await fetch(`${API_URL}/events?slug=${slug}`);
  const events = await response.json();
  return {
    props: {
      event: events[0],
      revalidate: 1,
    },
  };
}
