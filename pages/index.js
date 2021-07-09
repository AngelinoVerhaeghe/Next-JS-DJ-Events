import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";
import Link from "next/link";
import Search from "@/components/Search";

function HomePage({ events }) {
  return (
    <Layout>
      <Search />
      <h1 className="font-bold text-3xl pt-6 pb-8 text-gray-800 text-center">
        Upcoming Events
      </h1>
      {/* Show no events to page if length === 0 */}
      {events.length === 0 && <h3>No events to show</h3>}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 xl:gap-8 px-2 lg:px-0">
        {/* Foreach loop events with .map() + key*/}
        {events.map((event) => (
          <EventItem key={event.id} event={event} />
        ))}
      </div>
      {/* Button to go all events */}
      {events.length > 0 && (
        <div className="flex justify-center">
          <Link href="/events">
            <a className="py-2 px-6 bg-gray-600 rounded-lg text-white font-medium hover:bg-gray-800 focus:outline-none focus:ring ring-gray-400 transition duration-200 ease-in-out">
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

  const response = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=4`);
  const events = await response.json();

  return {
    /* Show only 3 events on homepage with slice() */
    props: { events },
    revalidate: 1,
  };
}
