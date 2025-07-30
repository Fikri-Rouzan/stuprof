import { FaTimes, FaMapMarkerAlt } from "react-icons/fa";
import type { Student } from "../../types";

interface StudentInfoModalProps {
  student: Student | null;
  onClose: () => void;
}

export default function StudentInfoModal({
  student,
  onClose,
}: StudentInfoModalProps) {
  if (!student) return null;

  const openDirections = (address: string | null | undefined) => {
    if (!address) return;

    const url = `https://maps.google.com/?q=${encodeURIComponent(address)}`;

    window.open(url, "_blank");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center backdrop-blur-md items-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 w-full max-w-3xl shadow-xl relative mx-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 py-1 px-1 text-gray-600 rounded-full hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
        >
          <FaTimes size={22} />
        </button>
        <h2 className="text-2xl text-center font-bold mt-6 mb-4 border-b pb-4">
          Student Details
        </h2>
        <div className="space-y-3">
          <p>
            <strong>Full Name:</strong> {student.name}
          </p>
          <p>
            <strong>NIM:</strong> {student.nim}
          </p>
          <p>
            <strong>Date of Birth:</strong>{" "}
            {new Date(student.dob).toLocaleDateString()}
          </p>
          <p>
            <strong>Phone Number:</strong> {student.phone || "-"}
          </p>
          <p>
            <strong>Hobby:</strong> {student.hobby || "-"}
          </p>
          <p>
            <strong>Address:</strong> {student.address || "-"}
          </p>
          {student.address && (
            <button
              type="button"
              onClick={() => openDirections(student.address)}
              className="mt-2 inline-flex items-center gap-2 text-primary hover:text-secondary hover:underline transition-colors duration-300 cursor-pointer"
            >
              <FaMapMarkerAlt /> View on Map
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
