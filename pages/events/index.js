import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";
import { FaCalendarAlt } from "react-icons/fa";
import { IconContext } from "react-icons";

function EventsPage({ events }) {
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
    </Layout>
  );
}

export default EventsPage;

export async function getStaticProps() {
  /* Make contact with api route */

  const response = await fetch(`${API_URL}/events?_sort=date:ASC`);
  const events = await response.json();

  return {
    props: {
      events,
    },
    revalidate: 1,
  };
}
