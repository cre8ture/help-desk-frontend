import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <div>
      <Link to="/helpdesk">
        <button>Go to Helpdesk</button>
      </Link>
      <Link to="/agent-dashboard">
        <button>Go to Agent Dashboard</button>
      </Link>
    </div>
  );
}

export default Navigation;