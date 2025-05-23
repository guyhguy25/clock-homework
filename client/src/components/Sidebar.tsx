import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { ChevronLeft, ChevronRight, LayoutDashboard, LogOut, ShieldUser, UserCheck, UserRoundPen } from "lucide-react";
import { useProfile } from "../api/userApi";

const iconMap: Record<string, React.ReactNode> = {
  "/": <LayoutDashboard />,
  "/profile": <UserRoundPen />,
  "/manager": <ShieldUser />,
  "/my-employee": <UserCheck />,
};

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const { data: userProfile } = useProfile();

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 640;

      // Auto-close when entering mobile view
      if (isMobile && isOpen) {
        setIsOpen(false);
      }
      // Auto-open when leaving mobile view
      else if (!isMobile) {
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const menuItems = [
    { path: "/", label: "Dashboard" },
    { path: "/profile", label: "Profile" },
    ...(userProfile?.user.role === "Manager" ? [{ path: "/manager", label: "Management" }, { path: "/my-employee", label: "My Employee" }] : []),
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      <aside
        className={`flex flex-col justify-between bg-primary text-white transition-all duration-300 shadow-md ${isOpen ? "w-64" : "w-20"
          } max-sm:w-20`}
      >
        {/* Top */}
        <div>
          <div className="flex items-center justify-between p-4">
            <div className="text-2xl font-bold max-sm:text-lg">{isOpen ? "Timesheet" : "TS"}</div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white max-sm:hidden"
            >
              {isOpen ? <ChevronLeft /> : <ChevronRight />}
            </button>
          </div>

          <nav className="mt-4">
            <ul className="flex flex-col gap-2 px-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center p-4 rounded-lg transition ${location.pathname === item.path
                      ? "bg-white text-primary font-semibold"
                      : "hover:bg-white hover:text-primary"
                      }`}
                  >
                    {isOpen ? item.label : iconMap[item.path]}
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
            {isOpen && <span className="text-secondary max-sm:hidden">Log out</span>}
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-1 bg-secondary p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Sidebar;