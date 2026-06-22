import { useEffect } from "react";

/**
 * Props:
 * isOpen
 * onClose
 * title
 * children
 */

function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () =>
      window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-80">
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        {children}

        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;