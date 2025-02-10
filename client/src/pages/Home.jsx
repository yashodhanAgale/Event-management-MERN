import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Event Management Platform
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Create, manage, and join events seamlessly. Sign up now to get started!
      </p>

      <div className="space-x-4">
        <Link
          to="/login"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
