import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>🏠 Welcome to the Home Page</h1>
      <p>Check out our amazing products:</p>
      
      {/* Adding a link to the Products Gallery */}
      <Link to="/products" style={{ fontSize: '20px', color: 'blue' }}>
        Go to Product Store →
      </Link>
    </div>
  );
};

export default Home;