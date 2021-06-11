import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";
import Showcase from "./Showcase";
/* Show only Showcase component on the Home page using useRouter this has the pathname of URL */
import { useRouter } from "next/router";
function Layout({ title, keywords, description, children }) {
  /* Define the router */
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      {/* Use router.pathname to set only on homepage */}
      {router.pathname === "/" && <Showcase />}
      <div className="container mx-auto">{children}</div>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "Dj Events | Find the hottest parties",
  description: "Find the latest DJ and other musical events",
  keywords: "music, dj, edm, events",
};

export default Layout;
