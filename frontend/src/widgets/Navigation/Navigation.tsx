import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Navigation.module.css";

function Navigation() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  
   return (
  <nav className={styles.navigation}>
   <Link to="/" className={styles.brand}>
  <span className={styles.brandMark} aria-hidden="true">
    <span className={styles.brandDotOne}></span>
    <span className={styles.brandDotTwo}></span>
    <span className={styles.brandDotThree}></span>
  </span>

  <strong className={styles.brandName}>AI Reception</strong>
</Link>

    <NavLink
  to="/dashboard"
  end
  className={({ isActive }) =>
    `${styles.link} ${isActive ? styles.active : ""}`
  }
>
  Dashboard
</NavLink>
    <NavLink
  to="/businesses"
  className={({ isActive }) =>
    `${styles.link} ${isActive ? styles.active : ""}`
  }
>
  Businesses
</NavLink>
    <NavLink
  to="/services"
  className={({ isActive }) =>
    `${styles.link} ${isActive ? styles.active : ""}`
  }
>
  Services
</NavLink>
    <NavLink
  to="/clients"
  className={({ isActive }) =>
    `${styles.link} ${isActive ? styles.active : ""}`
  }
>
  Clients
</NavLink>
    <NavLink
  to="/calls"
  className={({ isActive }) =>
    `${styles.link} ${isActive ? styles.active : ""}`
  }
>
  Calls
</NavLink>
    <NavLink
  to="/simulator"
  className={({ isActive }) =>
    `${styles.link} ${isActive ? styles.active : ""}`
  }
>
  Simulator
</NavLink>
    <NavLink
  to="/dialogue-scripts"
  className={({ isActive }) =>
    `${styles.link} ${isActive ? styles.active : ""}`
  }
>
  Dialogue Scripts
</NavLink>

    <button
  type="button"
  className={styles.logout}
  onClick={handleLogout}
>
  Logout
</button>
  </nav>
);
}

export default Navigation;
