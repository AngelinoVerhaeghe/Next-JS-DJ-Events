import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/* Form with INPUT so add useState */
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/Layout";
/* Post request add API_URL */
import { API_URL } from "@/config/index";
import { FaCalendarPlus } from "react-icons/fa";
import { IconContext } from "react-icons";

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
    <Layout title="Dj Events | Add New Event">
      <div className="container bg-white rounded-lg shadow-lg mx-2 sm:mx-0 lg:max-w-4xl lg:mx-auto">
        <div className="flex items-center p-6 pb-0">
          <IconContext.Provider value={{ className: "h-6 w-6" }}>
            <FaCalendarPlus className="text-gray-600" />
          </IconContext.Provider>
          <h1 className="text-3xl text-gray-600 font-bold ml-3">
            Create Event
          </h1>
        </div>

        <ToastContainer />

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 space-y-4 md:grid-cols-2 md:gap-4 md:space-y-0 p-6"
        >
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
          <div>
            <div>
              <label htmlFor="description" className="font-medium">
                Event Description
              </label>
              <textarea
                type="text"
                rows="5"
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
                className="py-2 px-4 w-full block cursor-pointer bg-indigo-500 rounded-lg text-white font-medium hover:bg-indigo-700 transition duration-200 ease-in-out focus:outline-none focus:ring focus:ring-offset-1 focus:ring-indigo-500"
              />
            </div>
            <div className="pt-8">
              <Link href="/events">
                <a className="py-2 px-5 bg-gray-600 rounded-lg text-white shadow-lg font-medium hover:bg-gray-800 transition duration-200 ease-in-out focus:outline-none focus:ring focus:ring-offset-1 focus:ring-gray-600">
                  Back
                </a>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
