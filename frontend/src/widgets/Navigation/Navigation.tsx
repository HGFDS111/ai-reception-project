import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <nav>
      <Link to="/">Dashboard</Link>
      <Link to="/clients">Clients</Link>
      <Link to="/calls">Calls</Link>
    </nav>
  )
}

export default Navigation