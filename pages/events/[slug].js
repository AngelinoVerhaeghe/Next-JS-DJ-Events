import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import Image from "next/image";
import Link from "next/link";
import { FaPencilAlt, FaTimes, FaCompactDisc } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { IconContext } from "react-icons";

function EventPage({ event }) {
  const router = useRouter();
  const deleteEvent = async (element) => {
    /* Make request to delete event */
    if (confirm("Are you sure?")) {
      /* Adding option because its a delete  ,{ method: "DELETE" }*/
      const response = await fetch(`${API_URL}/events/${event.id}`, {
        method: "DELETE",
      });

      const data = response.json();

      /* Check if delete is ok */
      if (!response.ok) {
        toast.error(data.message);
      } else {
        router.push("/events");
      }
    }
  };
  return (
    <Layout>
      <div className="container mx-auto space-y-2">
        <div className="flex items-center space-x-3 justify-end mx-2">
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
        <div className="bg-white rounded-lg shadow-lg lg:max-w-3xl lg:mx-auto mx-2 overflow-hidden relative">
          <ToastContainer />
          {/* Look if the image exists */}
          <div>
            {event.image && (
              <Image
                src={event.image.formats.medium.url}
                width={960}
                height={600}
                layout="responsive"
                objectFit
              />
            )}
          </div>
          <div className="space-y-3 p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl text-gray-600 font-bold">{event.name}</h1>
              <IconContext.Provider value={{ className: "h-8 w-8" }}>
                <FaCompactDisc className="text-purple-700" />
              </IconContext.Provider>
            </div>

            <span className="text-sm font-bold bg-purple-600 text-purple-50 py-1 px-3 rounded-full shadow-md absolute top-4 left-4">
              {new Date(event.date).toLocaleDateString("be-NL")}
            </span>

            <h3 className="font-bold tracking-wide">Time:</h3>
            <p className="text-sm text-gray-600">{event.time}</p>
            <h3 className="font-bold tracking-wide">Performers:</h3>
            <p className="text-sm text-gray-600">{event.performers}</p>
            <h3 className="font-bold tracking-wide">Description:</h3>
            <p className="text-md text-gray-600">{event.description}</p>
            <h3 className="font-bold tracking-wide">Venue:</h3>
            <p className="text-sm text-gray-600">{event.address}</p>
            <div className="pt-6">
              <Link href="/events">
                <a className="py-2 px-5 bg-gray-600 rounded-lg text-white font-medium hover:bg-gray-800 transition duration-200 ease-in-out">
                  Back
                </a>
              </Link>
            </div>
          </div>
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
