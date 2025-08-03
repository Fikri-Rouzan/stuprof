import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import type { Student } from "../../types";

interface StudentTableProps {
  students: Student[];
  currentPage: number;
  itemsPerPage: number;
  handleEdit: (student: Student) => void;
  handleInfo: (student: Student) => void;
  handleDelete: (id: string) => void;
}

export default function StudentTable({
  students,
  currentPage,
  itemsPerPage,
  handleEdit,
  handleInfo,
  handleDelete,
}: StudentTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg shadow mx-6">
      <table className="min-w-full">
        <thead className="bg-primary text-white text-lg">
          <tr>
            <th className="px-4 py-3 text-center w-20">No</th>
            <th className="px-4 py-3 text-left">NIM</th>
            <th className="px-4 py-3 text-left">Full Name</th>
            <th className="px-4 py-3 text-left">Date of Birth</th>
            <th className="px-4 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr
              key={student.id}
              className="border-b bg-gray-100 hover:bg-secondary/10 transition-colors duration-300"
            >
              <td className="px-4 py-3 text-center">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </td>
              <td className="px-4 py-3">{student.nim}</td>
              <td className="px-4 py-3">{student.name}</td>
              <td className="px-4 py-3">
                {new Date(student.dob).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-center items-center space-x-2">
                  <button
                    onClick={() => handleEdit(student)}
                    className="text-orange-400 hover:text-orange-700 p-2 cursor-pointer transition-colors duration-300"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleInfo(student)}
                    className="text-blue-500 hover:text-blue-700 p-2 cursor-pointer transition-colors duration-300"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="text-red-500 hover:text-red-800 p-2 cursor-pointer transition-colors duration-300"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
