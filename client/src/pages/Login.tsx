import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
  try {
    const res = await API.post("/auth/login", formData);

    console.log("LOGIN SUCCESS:", res.data);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    window.location.href = "/dashboard"; // force refresh
  } catch (error: any) {
    alert(error.response?.data?.message || "Login failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
      {/* CARD */}
      <div className="w-[420px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 text-white">
        
        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center mb-2">
          Smart Leads
        </h1>

        <p className="text-center text-gray-300 mb-6">
          Login to your dashboard
        </p>

        {/* FORM */}
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          {/* EMAIL */}
          <div>
            <label
              htmlFor="email"
              className="block mb-1"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 outline-none"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label
              htmlFor="password"
              className="block mb-1"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 outline-none"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* REGISTER LINK */}
        <p
          onClick={() => navigate("/register")}
          className="text-center text-sm mt-4 text-blue-400 cursor-pointer"
        >
          Don’t have an account? Register
        </p>

        {/* FOOTER */}
        <p className="text-xs text-center text-gray-400 mt-5">
          © 2026 Smart Leads Dashboard
        </p>
      </div>
    </div>
  );
};

export default Login;