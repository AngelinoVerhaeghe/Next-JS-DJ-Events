import moment from "moment";
import { FaImage } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/* Form with INPUT so add useState */
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
/* Post request add API_URL */
import { API_URL } from "@/config/index";

export default function EditEventPage({ event }) {
  const router = useRouter();
  /* Get all input values */
  /* Set them with the event. functionality */
  const [values, setValues] = useState({
    name: event.name,
    performers: event.performers,
    venue: event.venue,
    address: event.address,
    /* Npm install moment for date access and import moment*/
    date: event.date,
    time: event.time,
    description: event.description,
  });

  /* IMAGE Preview useState()*/
  /* Check if there is a image */
  const [imagePreview, setImagePreview] = useState(
    event.image ? event.image.formats.thumbnail.url : null
  );

  /* Set a state for Modal to false = not showing */
  const [showModal, setShowModal] = useState(false);

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

    /* All fields are filled in, sending a PUT request to Strapi backend and adding the event.id*/
    const response = await fetch(`${API_URL}/events/${event.id}`, {
      method: "PUT",
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
    <Layout title="Edit Event">
      <h1 className="text-3xl font-bold pb-8">Edit Event</h1>
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
              /* Set value with moment package moment().format('yyyy-DD-MM') */
              value={moment(values.date).format("yyyy-DD-MM")}
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
        <div className="mt-4">
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
            value="Update Event"
            className="py-2 px-4 w-full block cursor-pointer bg-indigo-500 rounded-lg text-white font-medium hover:bg-indigo-700 transition duration-200 ease-in-out"
          />
        </div>
      </form>

      <h2 className="text-3xl font-bold pt-6 pb-4">Event Image</h2>
      {/* Image preview here check if there is a image preview + import Image from next */}
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170} />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}

      <div className="pt-4">
        {/* Import react-icons */}
        {/* Set onClick to show Modal */}
        <button
          onClick={() => setShowModal(true)}
          type="button"
          className="py-2 px-4 flex items-center bg-indigo-600 rounded-lg text-white font-medium focus:outline-none focus:ring focus:ring-indigo-400 hover:bg-indigo-800 transition duration-200 ease-in-out"
        >
          <FaImage className="mr-2" /> Set Image
        </button>
      </div>

      <div className="mt-10">
        <Link href="/events">
          <a className="py-2 px-4 bg-gray-600 rounded-lg text-white font-medium hover:bg-gray-800 transition duration-200 ease-in-out">
            Back
          </a>
        </Link>
      </div>

      {/* Here component Modal with ending tag to show {children inside} */}
      {/*  Set some props to the modal tag */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        Image upload
      </Modal>
    </Layout>
  );
}

/* Get that event that u want to edit */
export async function getServerSideProps({ params: { id } }) {
  /* Get response -> event.id */
  const response = await fetch(`${API_URL}/events/${id}`);
  const event = await response.json();

  /* Return prop and add it to page {event} */
  return {
    props: {
      event,
    },
  };
}
