import { useState } from "react";
import { useNavigate, Link } from "react-router";
import Swal from "sweetalert2";
import api from "../api";
import { registerFormFields } from "../utils/register";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface RegisterFormData {
  nim: string;
  name: string;
  password: string;
  dob: string;
  phone: string;
  address: string;
  hobby: string;
}

export default function Register() {
  const [form, setForm] = useState<RegisterFormData>({
    nim: "",
    name: "",
    password: "",
    dob: "",
    phone: "",
    address: "",
    hobby: "",
  });
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "number" && value.includes("-")) {
      return;
    }

    setForm({ ...form, [name]: value });
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/register", form);
      Swal.fire({
        toast: true,
        position: "top-right",
        icon: "success",
        title: "Account Created Successfully!",
        text: "Please login with your new account.",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });
      navigate("/login");
    } catch (err: unknown) {
      setError(
        (err as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Registration failed. Please try again."
      );
    }
  };

  // Styling
  const inputBase =
    "w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2";
  const normalBorder = "border border-gray-300 focus:ring-primary";
  const errorBorder = "border-2 border-red-500 focus:ring-red-300";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
        {/* Information panel */}
        <div className="w-full lg:w-1/3 bg-primary p-8 flex items-center justify-center">
          <div className="text-center text-white">
            <h3 className="text-4xl font-bold mb-6">Welcome to StuProf!</h3>
            <p className="text-lg">Create your account to get started.</p>
          </div>
        </div>

        {/* Registration form panel */}
        <div className="w-full lg:w-2/3 p-8 lg:p-12">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-600">
            StuProf Registration
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {registerFormFields.map((field) => (
                <div
                  key={field.name}
                  className={field.type === "textarea" ? "md:col-span-2" : ""}
                >
                  <label
                    htmlFor={field.name}
                    className="block mb-2 text-gray-600 font-medium"
                  >
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      value={form.address}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      autoComplete={field.autoComplete}
                      className={`${inputBase} ${
                        error ? errorBorder : normalBorder
                      } `}
                      rows={3}
                    />
                  ) : (
                    <div className="relative">
                      <input
                        id={field.name}
                        type={
                          field.name === "password" && showPassword
                            ? "text"
                            : field.type
                        }
                        name={field.name}
                        value={form[field.name as keyof RegisterFormData]}
                        onChange={handleChange}
                        required={field.required}
                        placeholder={field.placeholder}
                        autoComplete={field.autoComplete}
                        className={`${inputBase} ${
                          error ? errorBorder : normalBorder
                        } pr-12`}
                      />
                      {field.name === "password" && (
                        <button
                          type="button"
                          className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-600"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <FaEyeSlash size={20} />
                          ) : (
                            <FaEye size={20} />
                          )}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {error && <p className="text-red-500 text-center pt-2">{error}</p>}

            <button
              type="submit"
              className="w-full cursor-pointer bg-primary text-white py-3 mt-4 rounded-lg font-semibold hover:bg-secondary transition-colors duration-300"
            >
              Register
            </button>
          </form>
          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
