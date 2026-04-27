import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for doesn't exist.</p>
      <Link to="/" style={{ color: '#3b82f6', textDecoration: 'underline' }}>
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;