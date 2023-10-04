import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[70vh]">
      404 not found!
      <Link to="/" className="text-[var(--main-color)]">
        Back to home
      </Link>
    </div>
  );
};

export default Error;
