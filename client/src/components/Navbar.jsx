import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clears localStorage
    navigate("/"); // Redirects to Home
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <span className="text-lg font-bold">Event Management</span>
      <div>
        {user ? (
          <>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">
              Login
            </Link>
            <Link to="/register" className="bg-green-500 px-3 py-1 rounded">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
