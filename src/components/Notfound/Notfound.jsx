import React from "react";
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div className="py-5 text-center">
      <h1>404, Nothing found</h1>
      <Link to="/account">
        <button>Back to Home</button>
      </Link>
    </div>
  );
};

export default Notfound;
