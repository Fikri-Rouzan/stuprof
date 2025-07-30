import { FaEye, FaEyeSlash } from "react-icons/fa";
import type { Student } from "../../types";
import { editProfile } from "../../utils/editProfile";

type ProfileFormData = Partial<
  Omit<Student, "id" | "createdAt" | "updatedAt">
> & { password?: string };

interface EditProfileFormProps {
  form: ProfileFormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSave: (e: React.FormEvent<HTMLFormElement>) => void;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  error: string;
}

export default function EditProfileForm({
  form,
  handleChange,
  handleSave,
  showPassword,
  setShowPassword,
  error,
}: EditProfileFormProps) {
  return (
    <form
      onSubmit={handleSave}
      className="space-y-4 bg-white p-6 rounded-lg shadow"
    >
      <h2 className="text-3xl text-center font-bold text-gray-600 border-b pb-4 mb-4">
        Edit Profile
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {editProfile.map((field) => (
          <div
            key={field.name}
            className={field.type === "textarea" ? "sm:col-span-2" : ""}
          >
            <label
              htmlFor={field.name}
              className="block font-medium text-gray-600"
            >
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={field.name}
                name={field.name}
                value={form.address || ""}
                onChange={handleChange}
                disabled={!field.editable}
                autoComplete={field.name}
                placeholder={field.placeholder}
                className="mt-2 block w-full px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm disabled:bg-gray-100 focus:outline-none focus:ring-primary focus:border-primary"
                rows={3}
              />
            ) : (
              <input
                id={field.name}
                type={field.type || "text"}
                name={field.name}
                value={form[field.name as keyof typeof form] || ""}
                onChange={handleChange}
                min={field.type === "number" ? 0 : undefined}
                disabled={!field.editable}
                autoComplete={field.name}
                placeholder={field.placeholder}
                className="mt-2 block w-full px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm disabled:bg-gray-100 focus:outline-none focus:ring-primary focus:border-primary"
              />
            )}
          </div>
        ))}

        <div className="sm:col-span-2">
          <label htmlFor="password" className="block font-medium text-gray-600">
            New Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password || ""}
              onChange={handleChange}
              placeholder="Leave blank to keep current"
              className="mt-1 block w-full px-4 py-3 pr-12 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center"
              onClick={() => setShowPassword((p) => !p)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-center pt-2">{error}</p>}

      <div className="pt-4 border-t">
        <button
          type="submit"
          className="w-full font-medium bg-primary text-white py-3 rounded-md shadow-sm hover:bg-secondary transition-colors duration-300 cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
