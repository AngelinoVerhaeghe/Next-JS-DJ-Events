// Bring in the Layout
import Layout from "@/components/Layout";
import { parseCookies } from "@/helpers/index";
import { API_URL } from "@/config/index";
import DashboardEvent from "@/components/DashboardEvent";

export default function DashboardPage({ events }) {
  /* //! Function to delete a event */
  const deleteEvent = (id) => {
    console.log(id);
  };

  return (
    <Layout title="User | Dashboard">
      <div className="bg-indigo-500 rounded-lg shadow p-6 mx-2 lg:mx-0">
        <div className="max-w-5xl mx-auto bg-white/40 backdrop-blur-md rounded-lg shadow p-6">
          <h1 className="text-3xl text-white font-bold">Dashboard</h1>
          <h3 className="text-2xl text-white font-semibold underline mt-4">
            My Events
          </h3>
          {/* //! Create a list of the events dont forget to set key atrribute */}

          {events.map((event) => (
            <DashboardEvent
              key={event.id}
              event={event}
              handleDelete={deleteEvent}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

//Get jwt token
export async function getServerSideProps({ req }) {
  // Get token out of request
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/events/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events = await res.json();

  return {
    props: {
      events,
    },
  };
}
