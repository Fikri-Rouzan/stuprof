import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import { getStudentFormFields } from "../../utils/studentData";
import type { Student } from "../../types";
import { useState } from "react";

type StudentFormData = Partial<
  Omit<Student, "id" | "createdAt" | "updatedAt">
> & { password?: string };

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: StudentFormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  editingId: string | null;
}

export default function StudentFormModal({
  isOpen,
  onClose,
  form,
  handleChange,
  handleSubmit,
  editingId,
}: ModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const formFields = getStudentFormFields(!!editingId);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-md "
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-2xl text-center font-bold mt-6 mb-4 border-b pb-4">
            {editingId ? "Student Edits" : "Add Student"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto pr-2">
            {formFields.map((field) => (
              <div
                key={field.name}
                className={field.type === "textarea" ? "md:col-span-2" : ""}
              >
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium"
                >
                  {field.label}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={form.address || ""}
                    onChange={handleChange}
                    required={field.required}
                    placeholder={field.placeholder}
                    autoComplete={field.autoComplete}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    rows={3}
                  />
                ) : (
                  <div className="relative">
                    <input
                      type={
                        field.name === "password" && showPassword
                          ? "text"
                          : field.type
                      }
                      id={field.name}
                      name={field.name}
                      value={form[field.name as keyof typeof form] || ""}
                      onChange={handleChange}
                      required={field.required}
                      min={field.type === "number" ? 0 : undefined}
                      placeholder={field.placeholder}
                      autoComplete={field.autoComplete}
                      className={`mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary ${
                        field.name === "password" ? "pr-12" : ""
                      }`}
                    />
                    {field.name === "password" && (
                      <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                        onClick={() => setShowPassword((p) => !p)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-2 pt-4 border-t justify-end md:justify-start">
            <button
              type="submit"
              className="bg-primary text-white px-4 py-3 rounded-md hover:bg-secondary transition-colors duration-300 cursor-pointer"
            >
              {editingId ? "Save Changes" : "Add Student"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-3 rounded-md hover:bg-gray-400 transition-colors duration-300 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
