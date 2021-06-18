import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";
import styles from "@/styles/Modal.module.css";

/* Getting some props {show modal or not}, function to close modal, children content in the modal and a optional title */
export default function Modal({ show, onClose, children, title }) {
  /* Set State to false */
  const [isBrowser, setIsBrowser] = useState(false);

  /* When everything is renderd useEffect() will be called*/
  useEffect(() => setIsBrowser(true));

  /* Set onClose function */

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  /* Only show Modal if show = true */
  const modalContent = show ? (
    <div
      class="fixed inset-0 w-full h-full z-20 bg-black bg-opacity-50 duration-700 overflow-y-auto"
      show={show}
      enter="transform transition duration-700 ease-in"
      enter-start="opacity-0"
      enter-end="opacity-100"
      leave="transform transition duration-700 ease-out"
      leave-start="opacity-100"
      leave-end="opacity-0"
    >
      <div class="relative sm:w-3/4 md:w-1/2 md:h-2/3 lg:w-1/3 lg:h-2/3 mx-2 sm:mx-auto my-10 opacity-100">
        <div
          class="relative bg-white shadow-lg rounded-md text-gray-900 z-20"
          enter="transition transform duration-700 ease-in"
          enter-start="scale-0"
          enter-end="scale-100"
          leave="transition transform duration-700 ease-out"
          leave-start="scale-100"
          leave-end="scale-0"
        >
          <header class="flex items-center justify-between p-6">
            <h2 class="font-semibold">{title}</h2>
            <a href="#" onClick={handleClose}>
              <FaTimes />
            </a>
          </header>
          <main class="p-2 text-center">{children}</main>
        </div>
      </div>
    </div>
  ) : null;

  /* Check if the window.document is available */
  if (isBrowser) {
    /* 1 argument is what u want to insert, 2 where to put it document.getElementById() */
    return ReactDOM.createPortal(
      modalContent,
      /* >>> modal-root is added in _document.js <<< */
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
}

/* Docs at site: https://devrecipes.net/modal-component-with-next-js/  making a modal component with Next.js*/
