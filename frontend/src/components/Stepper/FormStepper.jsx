import React from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useLocation, Link } from "react-router-dom";

const FormStepper = () => {
  const location = useLocation();

  const getCurrentPath = () => {
    return location.pathname.split("/")[1];
  };

  return (
    <div className="flex flex-row justify-between items-center p-[3px] border border-neutral-300 rounded-full">
      <Link
        to="/"
        className={`hover:bg-neutral-100 flex flex-row justify-center items-center gap-2 py-1 px-10 rounded-full ${
          getCurrentPath() === "" ? "bg-neutral-200 " : ""
        }`}
      >
        <div className="flex items-center">
          <IoDocumentTextOutline size={18} color="#404040" />
        </div>

        <div className="flex items-center">
          <p className="">Content</p>
        </div>
      </Link>
      <Link
        to="/design"
        className={`hover:bg-neutral-100 flex flex-row justify-center items-center gap-2 py-1 px-10 rounded-full ${
          getCurrentPath() === "design" ? "bg-neutral-200 " : ""
        }`}
      >
        <div className="flex items-center">
          <IoDocumentTextOutline size={18} color="#404040" />
        </div>

        <div className="flex items-center">
          <p className="">Design</p>
        </div>
      </Link>
      <Link
        to="/settings"
        className={`hover:bg-neutral-100 flex flex-row justify-center items-center gap-2 py-1 px-10 rounded-full ${
          getCurrentPath() === "settings" ? "bg-neutral-200 " : ""
        }`}
      >
        <div className="flex items-center">
          <IoDocumentTextOutline size={18} color="#404040" />
        </div>

        <div className="flex items-center">
          <p className="">Settings</p>
        </div>
      </Link>
    </div>
  );
};

export default FormStepper;
