import React, { useState } from "react";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  const handleError = (error) => {
    setHasError(true);
    console.error(error);
  };

  if (hasError) {
    return (
      <div>
        <h1>Something went wrong.</h1>
        <p>Please try refreshing the page or contact support.</p>
      </div>
    );
  }

  return <div>{children}</div>;
};

export default ErrorBoundary;
