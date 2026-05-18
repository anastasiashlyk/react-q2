import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="not-found">
      <h3>404</h3>
      <Link to="/">HOME</Link>
    </div>
  );
}

export default NotFoundPage;
