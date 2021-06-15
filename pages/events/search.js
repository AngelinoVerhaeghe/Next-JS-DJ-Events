import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";
import qs from "qs";
import Link from "next/link";

function SearchPage({ events }) {
  const router = useRouter();
  return (
    <Layout title="Search Results">
      <h1 className="font-bold text-3xl py-6">
        Search Results for {router.query.term}
      </h1>
      {/* Show no events to page if length === 0 */}
      {events.length === 0 && <h3>No events to show</h3>}

      {/* Foreach loop events with .map() + key*/}
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
      <div className="mt-10">
        <Link href="/events">
          <a className="py-2 px-4 bg-gray-600 rounded-lg text-white font-medium hover:bg-gray-800 transition duration-200 ease-in-out">
            Back
          </a>
        </Link>
      </div>
    </Layout>
  );
}

export default SearchPage;

export async function getServerSideProps({ query: { term } }) {
  /* Query matching */
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term },
      ],
    },
  });

  /* Make contact with api route */

  const response = await fetch(`${API_URL}/events?${query}`);
  const events = await response.json();

  return {
    props: {
      events,
    },
  };
}
