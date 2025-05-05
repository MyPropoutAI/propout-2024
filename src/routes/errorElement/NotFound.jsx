import { useEffect, forwardRef } from "react";
import PropTypes from "prop-types";
import { useRouteError, Link } from "react-router-dom";

const NotFound = forwardRef(({ reset }, ref) => {
  const error = useRouteError();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
  return (
    <div
      ref={ref}
      className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4"
    >
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-600 mb-8">
          We apologize for the inconvenience. An error has occurred.
        </p>
        <div className="space-y-4">
          <button
            onClick={() => reset()}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded transition duration-300 ease-in-out"
          >
            Try again
          </button>
          <Link
            to="/"
            className="block w-full border border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded hover:bg-gray-50 transition duration-300 ease-in-out"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
});

NotFound.displayName = "NotFound";

NotFound.propTypes = {
  reset: PropTypes.func,
};

export default NotFound;
