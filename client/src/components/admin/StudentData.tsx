import { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import api from "../../api";
import type { Student } from "../../types";
import StudentTable from "./StudentTable";
import StudentInfoModal from "./StudentInfoModal";
import StudentFormModal from "./StudentFormModal";
import { FaSearch } from "react-icons/fa";

type StudentFormData = Partial<
  Omit<Student, "id" | "createdAt" | "updatedAt">
> & { password?: string };

export default function StudentData() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [form, setForm] = useState<StudentFormData>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [infoStudent, setInfoStudent] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchStudents = useCallback(async () => {
    const token = localStorage.getItem("token");
    const { data } = await api.get<Student[]>("/students", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setStudents(data);
    setFilteredStudents(data);
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOpenAddModal = () => {
    setEditingId(null);
    setForm({});
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (student: Student) => {
    setEditingId(student.id);
    setForm({
      ...student,
      dob: String(student.dob).slice(0, 10),
      password: "",
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setForm({});
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const url = editingId ? `/students/${editingId}` : "/students";
    const method = editingId ? "put" : "post";

    try {
      await api[method](url, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire({
        toast: true,
        position: "top-right",
        icon: "success",
        title: "Success!",
        text: `Student ${editingId ? "updated" : "added"} successfully.`,
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });
      handleCloseModal();
      fetchStudents();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : "Operation failed.";
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: errorMessage,
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });
    }
  };

  const handleDelete = async (id: string) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "This student data will be permanently deleted.",
      showCancelButton: true,
      confirmButtonColor: "#fb2c36",
      confirmButtonText: "Yes, Delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("token");
          await api.delete(`/students/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          Swal.fire({
            toast: true,
            position: "top-right",
            icon: "success",
            title: "Success!",
            text: "Student data has been deleted.",
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
          });

          fetchStudents();
        } catch {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Failed to delete student data.",
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
          });
        }
      }
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setFilteredStudents(
      students.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.nim.toLowerCase().includes(query)
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center items-center">
        <h3 className="text-3xl text-center font-bold text-gray-600">
          Student Data
        </h3>
      </div>
      <div className="p-6 space-y-6">
        <button
          onClick={handleOpenAddModal}
          className="bg-primary text-center text-white px-4 py-3 rounded-md w-full md:w-auto hover:bg-secondary transition-colors duration-300 cursor-pointer"
        >
          Add Student
        </button>
        <div className="flex justify-end">
          <div className="relative w-full md:w-1/3">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
            <input
              id="search"
              type="text"
              placeholder="Search by Name or NIM"
              onChange={handleSearch}
              className="w-full pl-10 px-4 py-3 border rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:ring-2"
            />
          </div>
        </div>
      </div>

      <div>
        <StudentTable
          students={filteredStudents}
          handleEdit={handleOpenEditModal}
          handleInfo={setInfoStudent}
          handleDelete={handleDelete}
        />
      </div>

      <StudentFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        editingId={editingId}
      />
      <StudentInfoModal
        student={infoStudent}
        onClose={() => setInfoStudent(null)}
      />
    </div>
  );
}
