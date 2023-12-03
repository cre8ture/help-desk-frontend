import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <div>
      <Link to="/">
        <button className="nav-button" style={{border: '1px solid black', background: "white", color: "black"}}>Go to Home</button>
      </Link>
    </div>
  );
}

export default Navigation;