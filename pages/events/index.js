import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL, PER_PAGE } from "@/config/index";
import { FaCalendarAlt } from "react-icons/fa";
import { IconContext } from "react-icons";
import Pagination from "@/components/Pagination";

function EventsPage({ events, page, total }) {
  return (
    <Layout>
      <div className="border-b-2 border-indigo-500 mb-4 mx-2 lg:mx-0">
        <div className="flex items-center px-2 lg:px-0">
          <IconContext.Provider value={{ className: "h-6 w-6" }}>
            <FaCalendarAlt className="text-gray-600" />
          </IconContext.Provider>
          <h1 className="flex-grow font-bold text-gray-600 text-3xl ml-3">
            Events
          </h1>
        </div>
      </div>

      {/* Show no events to page if length === 0 */}
      {events.length === 0 && <h3>No events to show</h3>}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-2 lg:px-0">
        {/* Foreach loop events with .map() + key*/}
        {events.map((event) => (
          <EventItem key={event.id} event={event} />
        ))}
      </div>
      <Pagination page={page} total={total} />
    </Layout>
  );
}

export default EventsPage;

export async function getServerSideProps({ query: { page = 1 } }) {
  /* Calculate start page */
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  /* Fetch Total/Count */
  const totalResponse = await fetch(`${API_URL}/events/count`);
  const total = await totalResponse.json();

  /* Make contact with api route */
  /* Fetch Events */
  const eventResponse = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const events = await eventResponse.json();

  return {
    props: {
      events,
      page: +page,
      total,
    },
  };
}
