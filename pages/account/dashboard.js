// Bring in the Layout
import Layout from "@/components/Layout";
import { parseCookies } from "@/helpers/index";
import { API_URL } from "@/config/index";

export default function DashboardPage({ events }) {
  console.log(events);
  return (
    <Layout title="User | Dashboard">
      <h1>Dashboard</h1>
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
