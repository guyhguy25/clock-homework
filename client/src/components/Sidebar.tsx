import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/profile", label: "Profile" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside
      className={`h-screen ${isOpen ? "w-64" : "w-20"
        } bg-primary text-white flex flex-col transition-all duration-300 shadow-md`}
    >
      {/* Toggle Button */}
      <div className="flex items-center justify-between p-4">
        <div className="text-2xl font-bold">{isOpen ? "Timesheet" : "TS"}</div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? "<" : ">"}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="flex flex-col gap-4 px-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center p-4 rounded-lg transition ${location.pathname === item.path
                    ? "bg-white text-primary font-semibold"
                    : "hover:bg-white hover:text-primary"
                  }`}
              >
                {isOpen ? item.label : item.label.charAt(0)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 mb-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 p-3 bg-red-500 hover:bg-red-600 rounded-lg transition"
        >
          <LogOut size={20} />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;