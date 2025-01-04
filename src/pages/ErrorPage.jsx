import { Link } from 'react-router-dom';
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div>
      <h1>Error</h1>
      <div>
        <h2>Seems like we have an issue</h2>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <Link to="/">Go back home</Link>
      </div>
    </div>
  );
}
