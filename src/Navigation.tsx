import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <div>
      <Link to="/">
        <button style={{border: '1px solid black', background: "white", color: "black"}}>Go to Home</button>
      </Link>
      {/* <Link to="/agent-dashboard">
        <button>Go to Agent Dashboard</button>
      </Link> */}
    </div>
  );
}

export default Navigation;