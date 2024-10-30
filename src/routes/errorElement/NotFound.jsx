import { useRouteError } from "react-router-dom";

const NotFound = () => {
  const error = useRouteError();

  return <div>Check Console</div>;
};

export default NotFound;
