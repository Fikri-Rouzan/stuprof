import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FaBars } from "react-icons/fa";
import Sidebar from "../components/admin/Sidebar";
import StudentData from "../components/admin/StudentData";
import History from "../components/admin/History";

type AdminTab = "students" | "history";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>("students");
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.clear();

    Swal.fire({
      toast: true,
      position: "top-right",
      icon: "success",
      title: "Logout Successful!",
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
    });

    navigate("/login", { replace: true });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "history":
        return <History />;
      case "students":
      default:
        return <StudentData />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col overflow-hidden md:pl-64">
        <header className="bg-white shadow-sm flex items-center justify-between px-6 py-4">
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-600 pb-2">
            {activeTab === "students" ? "Student Data" : "Login History"}
          </h1>
          <div className="w-6" />
        </header>

        <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
      </div>
    </div>
  );
}
