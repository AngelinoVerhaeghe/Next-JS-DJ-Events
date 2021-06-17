import Layout from "@/components/Layout";

function AboutPage() {
  return (
    <Layout title="About | DJ Events">
      <h1 className="font-bold text-3xl pt-6 pb-8 text-white text-center">
        About
      </h1>
      <div className="text-gray-800 text-lg text-center mx-2">
        <p>This is an app to find the latest DJ and other musical events.</p>
        <p>Version: 1.0.0</p>
      </div>
    </Layout>
  );
}

export default AboutPage;
