import { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import api from "../../api";
import type { HistoryRecord } from "../../types";
import { FaTrashAlt } from "react-icons/fa";

export default function History() {
  const [records, setRecords] = useState<HistoryRecord[]>([]);

  const fetchHistory = useCallback(async () => {
    const token = localStorage.getItem("token");
    const { data } = await api.get<HistoryRecord[]>("/history", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setRecords(data);
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Delete this history?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#fb2c36",
      confirmButtonText: "Yes, Delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("token");
          await api.delete(`/history/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          Swal.fire({
            toast: true,
            position: "top-right",
            icon: "success",
            title: "Succeed!",
            text: "History records have been deleted.",
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
          });

          fetchHistory();
        } catch {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Failed to delete history record.",
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
          });
        }
      }
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-center items-center">
        <h3 className="text-3xl text-center font-bold text-gray-600 mb-4">
          Student Login History
        </h3>
      </div>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-primary text-white text-lg">
            <tr>
              <th className="px-4 py-3 text-left">NIM</th>
              <th className="px-4 py-3 text-left">Full Name</th>
              <th className="px-4 py-3 text-left">Last Login</th>
              <th className="px-4 py-3 text-left">Last Logout</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec) => (
              <tr
                key={rec.id}
                className="border-b bg-gray-100 hover:bg-secondary/10 transition-colors duration-300"
              >
                <td className="px-4 py-3">{rec.student?.nim || "-"}</td>
                <td className="px-4 py-3">{rec.student?.name || "-"}</td>
                <td className="px-4 py-3">
                  {rec.lastLogin
                    ? new Date(rec.lastLogin).toLocaleString()
                    : "-"}
                </td>
                <td className="px-4 py-3">
                  {rec.lastLogout
                    ? new Date(rec.lastLogout).toLocaleString()
                    : "-"}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleDelete(rec.id)}
                    className="text-red-500 hover:text-red-800 p-2 cursor-pointer transition-colors duration-300"
                    title="Delete this history"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
