import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/* Form with INPUT so add useState */
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/Layout";
/* Post request add API_URL */
import { API_URL } from "@/config/index";

export default function AddEventPage() {
  const router = useRouter();
  /* Get all input values */
  const [values, setValues] = useState({
    name: "",
    performers: "",
    venue: "",
    address: "",
    date: "",
    time: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    /* Validation */
    /* Check if there are empty fields */
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );

    if (hasEmptyFields) {
      toast.error("Please fill in all fields!");
    }

    /* All fields are filled in, sending a POST request to Strapi backend */
    const response = await fetch(`${API_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    /* Check if response is NOT OK */

    if (!response.ok) {
      toast.error("Something went wrong!");
    } else {
      /*  Response OK then redirect to event using router {slug}*/
      const event = await response.json();
      router.push(`/events/${event.slug}`);
    }
  };

  const handleInputChange = (e) => {
    /* Get value out of input attribute name="" - e.target */
    const { name, value } = e.target;
    /* Set the values [name] just overwrite the one needed*/
    setValues({ ...values, [name]: value });
  };

  return (
    <Layout title="Add New Event">
      <h1>Add Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 px-2 md:px-0">
          <div>
            <label htmlFor="name" className="font-medium">
              Event Name
            </label>
            <input
              type="text"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm border-gray-300"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers" className="font-medium">
              Performers
            </label>
            <input
              type="text"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm border-gray-300"
              id="performers"
              name="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue" className="font-medium">
              Venue
            </label>
            <input
              type="text"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm border-gray-300"
              id="venue"
              name="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address" className="font-medium">
              Address
            </label>
            <input
              type="text"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm border-gray-300"
              id="address"
              name="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date" className="font-medium">
              Date
            </label>
            <input
              type="date"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm border-gray-300"
              id="date"
              name="date"
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time" className="font-medium">
              Time
            </label>
            <input
              type="text"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm border-gray-300"
              id="time"
              name="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="px-2 mt-4">
          <label htmlFor="description" className="font-medium">
            Event Description
          </label>
          <textarea
            type="text"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm border-gray-300"
            id="description"
            name="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="mt-8">
          <input
            type="submit"
            value="Add Event"
            className="py-2 px-4 w-full block cursor-pointer bg-indigo-500 rounded-lg text-white font-medium hover:bg-indigo-700 transition duration-200 ease-in-out"
          />
        </div>
      </form>

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
