import { useState } from "react";
import { useNavigate, Link } from "react-router";
import api from "../api";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

export default function Login() {
  const [credential, setCredential] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await api.post("/auth/login", { credential, password });

      const { token, role, user } = data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      Swal.fire({
        toast: true,
        position: "top-right",
        icon: "success",
        title: `Welcome, ${user.name}!`,
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });

      navigate(role === "admin" ? "/admin/dashboard" : "/student/dashboard", {
        replace: true,
      });
    } catch (err: unknown) {
      setError(
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Login failed. Please check your credentials."
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
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
        {/* Information panel */}
        <div className="w-full lg:w-1/3 bg-primary p-8 flex items-center justify-center">
          <div className="text-center text-white">
            <h3 className="text-4xl font-bold mb-6">Glad to See You!</h3>
            <p className="text-lg">
              Dive into your Student Profile with StuProf.
            </p>
          </div>
        </div>

        {/* Panel form login */}
        <div className="w-full lg:w-2/3 p-8 lg:p-12">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-600">
            StuProf Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="credential"
                className="block mb-2 text-gray-600 font-medium"
              >
                NIM (Username)
              </label>
              <input
                id="credential"
                type="text"
                name="credential"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
                className={`${inputBase} ${error ? errorBorder : normalBorder}`}
                placeholder="Enter your NIM"
                autoComplete="credential"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-gray-600 font-medium"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`${inputBase} ${
                    error ? errorBorder : normalBorder
                  } pr-12`}
                  placeholder="Enter your password"
                />
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
              </div>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button
              type="submit"
              className="w-full cursor-pointer bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition-colors duration-300"
            >
              Login
            </button>
          </form>
          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
