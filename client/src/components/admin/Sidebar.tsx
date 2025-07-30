import Swal from "sweetalert2";
import { FaUsers, FaHistory, FaSignOutAlt, FaTimes } from "react-icons/fa";

type AdminTab = "students" | "history";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  handleLogout: () => void;
}

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  activeTab,
  setActiveTab,
  handleLogout,
}: SidebarProps) {
  const confirmLogout = () => {
    Swal.fire({
      title: "Are you sure you want to exit?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#a16ee0",
      confirmButtonText: "Yes, Exit!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
      }
    });
  };

  const NavButton = ({
    tab,
    icon,
    children,
    activeColor = "bg-secondary",
    hoverColor = "hover:bg-secondary",
  }: {
    tab: AdminTab;
    icon: React.ReactNode;
    children: React.ReactNode;
    activeColor?: string;
    hoverColor?: string;
  }) => (
    <button
      onClick={() => {
        setActiveTab(tab);
        setSidebarOpen(false);
      }}
      className={`flex items-center w-full font-medium px-6 py-3 cursor-pointer transition-colors duration-300 ${hoverColor} ${
        activeTab === tab ? activeColor : ""
      }`}
    >
      <span className="w-6 text-center mr-3">{icon}</span>
      <span>{children}</span>
    </button>
  );

  return (
    <div
      className={`flex flex-col fixed inset-y-0 left-0 z-40 w-64 bg-primary text-white shadow-lg transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out md:translate-x-0`}
    >
      <div className="flex items-center justify-between h-18 border-b border-gray-50 px-4">
        <span className="text-2xl font-bold mx-auto">Admin</span>
        <button className="md:hidden p-2" onClick={() => setSidebarOpen(false)}>
          <FaTimes size={20} />
        </button>
      </div>

      <nav className="mt-6 flex-1">
        <NavButton tab="students" icon={<FaUsers />}>
          Student Data
        </NavButton>
        <NavButton tab="history" icon={<FaHistory />}>
          Login History
        </NavButton>
      </nav>
      <div className="mt-auto border-t border-gray-50">
        <button
          onClick={confirmLogout}
          className="flex items-center w-full px-6 py-3 hover:bg-red-500 cursor-pointer transition-colors duration-300"
        >
          <span className="w-6 text-center mr-3">
            <FaSignOutAlt />
          </span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
