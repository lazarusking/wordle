import { XCircleIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useRef } from "react";

export default function BaseModal({ title, setModal, children }) {
  const dialogRef = useRef();
  const modalRef = useRef(null);
  function handleOutsideClick(event) {
    event.stopPropagation();

    const node = dialogRef.current;
    // console.debug(node);
    // console.debug(event.currentTarget, event.target, event.target === node);
    if (event.target === node) {
      return setModal(false);
    }
  }
  const handleShow = useCallback(() => {
    setModal((show) => !show);
  }, [setModal]);

  useEffect(() => {
    const node = modalRef.current;
    const handleCancel = (event) => {
      event.preventDefault();
      if (event.key === "Escape") {
        handleShow();
      }
    };
    if (node) {
      window.addEventListener("keydown", handleCancel);
    }

    return () => {
      window?.removeEventListener("keydown", handleCancel);
    };
  }, [handleShow]);

  return (
    <div
      className="absolute z-20"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      ref={modalRef}
    >
      <div className="fixed inset-0 overflow-y-auto animate-opacity transition ease-in-out duration-500 bg-gray-500 bg-opacity-75 focus:bg-slate-900">
        <div
          ref={dialogRef}
          onClick={handleOutsideClick}
          className="flex min-h-full justify-center p-4 text-center items-center sm:p-0"
        >
          {" "}
          <article className="bg-[var(--background)] transform overflow-hidden rounded-lg shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
            <header className="flex text-center text-lg px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h2 className="flex-1">{title}</h2>
              <div className="ml-auto">
                <button aria-label="Close Icon" onClick={() => setModal(false)}>
                  <XCircleIcon title="Close dialog" className="w-6 h-6" />
                </button>
              </div>
            </header>
            {children}
          </article>
        </div>
      </div>
    </div>
  );
}
