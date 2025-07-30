import { FaBars } from "react-icons/fa";
import Sidebar from "../components/student/Sidebar";
import MyProfile from "../components/student/MyProfile";
import EditProfileForm from "../components/student/EditProfileForm";
import Guide from "../components/student/Guide";
import { useStudentDashboard } from "../hooks/useStudentDashboard";

export default function StudentDashboard() {
  const {
    profile,
    form,
    loading,
    error,
    showPassword,
    setShowPassword,
    sidebarOpen,
    setSidebarOpen,
    activeTab,
    setActiveTab,
    handleChange,
    handleSave,
    handleLogout,
  } = useStudentDashboard();

  const getTitle = () => {
    if (activeTab === "profile") return "My Profile";
    if (activeTab === "editProfile") return "Edit Profile";
    if (activeTab === "guide") return "Guide";
    return "Dashboard";
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <MyProfile profile={profile} />;
      case "editProfile":
        return (
          <EditProfileForm
            form={form}
            handleChange={handleChange}
            handleSave={handleSave}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            error={error}
          />
        );
      case "guide":
        return <Guide />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen text-lg flex items-center justify-center bg-gray-50">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleLogout={handleLogout}
        profile={profile}
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
            {getTitle()}
          </h1>
          <div className="w-6" />
        </header>

        <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
      </div>
    </div>
  );
}
