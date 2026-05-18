import { NavLink, useNavigate } from "react-router-dom";
import { Home, Users, BarChart3 } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-5 py-4 rounded-2xl transition-all duration-300 font-medium
    ${
      isActive
        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
        : "text-gray-300 hover:bg-white/10 hover:text-white"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="w-72 min-h-screen bg-[#111827] border-r border-white/10 p-6 flex flex-col">
      {/* LOGO */}
      <div className="mb-10">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Smart Leads
        </h1>

        <p className="text-gray-400 mt-2 text-lg">CRM Dashboard</p>
      </div>

      {/* NAVIGATION */}
      <nav className="space-y-4 flex-1">
        <NavLink to="/dashboard" className={linkStyle}>
          <Home size={22} />
          Dashboard
        </NavLink>

        <NavLink to="/leads" className={linkStyle}>
          <Users size={22} />
          Leads
        </NavLink>

        <NavLink to="/analytics" className={linkStyle}>
          <BarChart3 size={22} />
          Analytics
        </NavLink>
      </nav>

      {/* USER CARD */}
      <div className="bg-white/10 border border-white/10 rounded-2xl p-5 mb-4">
        <p className="text-gray-400 text-sm">Logged in as</p>

        <h3 className="text-white text-2xl font-bold mt-2">
          {user?.role || "User"}
        </h3>
      </div>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;