import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav className="bg-gray-800 text-white h-screen p-4">
      <h1 className="text-lg font-bold mb-4">RBAC Dashboard</h1>
      <ul>
        <li className="mb-2">
          <NavLink to="/users" className="text-gray-200 hover:text-white">
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/roles" className="text-gray-200 hover:text-white">
            Roles
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
