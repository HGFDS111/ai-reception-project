import { Link, useNavigate } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">Dashboard</Link>
      <Link to="/businesses">Businesses</Link>
      <Link to="/services">Services</Link>
      <Link to="/clients">Clients</Link>
      <Link to="/calls">Calls</Link>
      <Link to="/dialogue-scripts">Dialogue Scripts</Link>

      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

export default Navigation;
