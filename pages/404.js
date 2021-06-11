import { FaExclamationTriangle } from "react-icons/fa";
import Link from "next/link";
import Layout from "@/components/Layout";

function PageNotFound() {
  return (
    <Layout title="Page Not Found">
      <div className="py-10 space-y-6">
        <div className="flex items-center space-x-2">
          <FaExclamationTriangle className="h-8 w-8 text-red-500" />
          <h1 className="text-3xl font-bold">404</h1>
        </div>

        <h4 className="text-2xl font-medium">Sorry, there is nothing here</h4>
        <Link href="/">
          <button
            type="button"
            className="py-2 px-4 bg-red-500 rounded-lg text-white font-medium hover:bg-red-700 transition duration-200 ease-in-out"
          >
            Go Back
          </button>
        </Link>
      </div>
    </Layout>
  );
}

export default PageNotFound;
