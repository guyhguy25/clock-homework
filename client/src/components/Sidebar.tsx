import { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { LogOut } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { path: "/", label: "Dashboard" },
    { path: "/profile", label: "Profile" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar itself */}
      <aside
        className={`flex flex-col justify-between bg-primary text-white transition-all duration-300 shadow-md ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Top */}
        <div>
          <div className="flex items-center justify-between p-4">
            <div className="text-2xl font-bold">{isOpen ? "Timesheet" : "TS"}</div>
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? "<" : ">"}
            </button>
          </div>

          <nav className="mt-4">
            <ul className="flex flex-col gap-2 px-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center p-4 rounded-lg transition ${
                      location.pathname === item.path
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
        </div>

        {/* Bottom */}
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

      {/* Main content area */}
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Sidebar;