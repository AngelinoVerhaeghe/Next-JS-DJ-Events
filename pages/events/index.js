import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL, PER_PAGE } from "@/config/index";
import { FaCalendarAlt } from "react-icons/fa";
import { IconContext } from "react-icons";
import Pagination from "@/components/Pagination";

function EventsPage({ events, page, total }) {
  return (
    <Layout>
      <IconContext.Provider value={{ className: "h-6 w-6" }}>
        <div className="flex items-center space-x-3">
          <FaCalendarAlt />
          <h1 className="font-bold text-3xl py-6">Events</h1>
        </div>
      </IconContext.Provider>
      {/* Show no events to page if length === 0 */}
      {events.length === 0 && <h3>No events to show</h3>}

      {/* Foreach loop events with .map() + key*/}
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}

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
