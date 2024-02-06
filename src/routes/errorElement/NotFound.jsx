import { useRouteError } from "react-router-dom";

const NotFound = () => {
  const error = useRouteError();

  return <div>NotFound</div>;
};

export default NotFound;
