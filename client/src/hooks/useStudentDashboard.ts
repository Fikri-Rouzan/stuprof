import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import api from "../api";
import type { Student } from "../types";

export type StudentTab = "profile" | "editProfile" | "guide";

type ProfileFormData = Partial<
  Omit<Student, "id" | "createdAt" | "updatedAt">
> & { password?: string };

export function useStudentDashboard() {
  const [profile, setProfile] = useState<Student | null>(null);
  const [form, setForm] = useState<ProfileFormData>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<StudentTab>("profile");
  const navigate = useNavigate();

  const fetchProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
      const { data } = await api.get<Student>("/students/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(data);
    } catch {
      localStorage.clear();
      navigate("/login", { replace: true });
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (activeTab === "editProfile" && profile) {
      setForm({
        name: profile.name,
        nim: profile.nim,
        dob: String(profile.dob).slice(0, 10),
        phone: profile.phone || "",
        address: profile.address || "",
        hobby: profile.hobby || "",
        password: "",
      });
      setError("");
      setShowPassword(false);
    }
  }, [activeTab, profile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const payload = { ...form };
      if (!payload.password) delete payload.password;

      const token = localStorage.getItem("token");
      const { data: updatedProfile } = await api.put<Student>(
        "/students/me",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProfile(updatedProfile);
      Swal.fire({
        toast: true,
        position: "top-right",
        icon: "success",
        title: "Profile Updated Successfully!",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });
      setActiveTab("profile");
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Failed to update profile.";
      setError(message);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: message,
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await api.post(
          "/auth/logout",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    } catch (err) {
      console.error(
        "Server logout failed, but proceeding with client logout.",
        err
      );
    } finally {
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
    }
  };

  return {
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
  };
}
