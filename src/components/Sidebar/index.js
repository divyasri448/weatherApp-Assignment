import { Link } from "react-router-dom";
import "./index.css";

const Sidebar = () => {
  return (
    <ul className="nav-container">
      <Link to="/" className="nav-link">
        <li className="nav-item">Main</li>
      </Link>
      <Link to="/search" className="nav-link">
        <li className="nav-item">Search Location</li>
      </Link>
      {/* <Link to="details" className="nav-link">
        <li className="nav-item">Details</li>
      </Link> */}
    </ul>
  );
};

export default Sidebar;
