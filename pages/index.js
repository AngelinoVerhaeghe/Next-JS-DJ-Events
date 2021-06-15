import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";
import Link from "next/link";

function HomePage({ events }) {
  return (
    <Layout>
      <h1 className="font-bold text-3xl py-6">Upcoming Events</h1>
      {/* Show no events to page if length === 0 */}
      {events.length === 0 && <h3>No events to show</h3>}

      {/* Foreach loop events with .map() + key*/}
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}

      {/* Button to go all events */}
      {events.length > 0 && (
        <div className="mt-10">
          <Link href="/events">
            <a className="py-2 px-4 bg-gray-600 rounded-lg text-white font-medium hover:bg-gray-800 transition duration-200 ease-in-out">
              View All Events
            </a>
          </Link>
        </div>
      )}
    </Layout>
  );
}

export default HomePage;

export async function getStaticProps() {
  /* Make contact with api route */

  const response = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`);
  const events = await response.json();

  return {
    /* Show only 3 events on homepage with slice() */
    props: { events },
    revalidate: 1,
  };
}
