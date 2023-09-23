import React from "react";

const Loader = () => {
  return (
    <div className="text-center flex justify-center">
      <p>
        <svg
          className="animate-spin h-5 w-5 mr-3 border-t-2 border-green-600 rounded-full"
          viewBox="0 0 24 24"
        ></svg>
      </p>
    </div>
  );
};

export default Loader;
