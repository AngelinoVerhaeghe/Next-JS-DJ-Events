import { useState } from "react";
import { API_URL } from "@/config/index";

/* Set the props that comes with imageupload component */
function ImageUpload({ eventId, imageUploaded }) {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", image);
    /* Get image to Strapi backend */
    formData.append("ref", "events");
    formData.append("refId", eventId);
    formData.append("field", "image");

    /* Make the response */
    const response = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      /* Call function to upload */
      imageUploaded();
    }
  };

  const handleFileChange = (e) => {
    /* Single file upload */
    setImage(e.target.files[0]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="text-sm font-medium text-gray-700">
            Event Image
          </label>
          <div className="mt-6">
            <input type="file" onChange={handleFileChange} />
          </div>
        </div>
        <footer class="flex justify-center pt-6">
          <input
            type="submit"
            value="Upload"
            className="p-2 w-32 block bg-indigo-500 rounded-lg text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring ring-indigo-400 ring-offset-2 transition duration-200 ease-in-out"
          />
        </footer>
        <div className="mt-4"></div>
      </form>
    </div>
  );
}

export default ImageUpload;

{
  /* <div>
<label htmlFor="file" className="font-medium">
  Select Image
</label>
<div>
  <input type="file" onChange={handleFileChange} />
</div>
</div>
<input
type="submit"
value="Upload"
className="py-2 px-4 block bg-indigo-500 rounded-lg text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring ring-indigo-400 ring-offset-2 transition duration-200 ease-in-out"
/> */
}
