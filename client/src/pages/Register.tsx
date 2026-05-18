import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // TEMP TOKEN
    localStorage.setItem("token", "user_logged_in");

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-black to-pink-700">

      <div className="w-[420px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 text-white">

        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h1>

        <p className="text-center text-gray-300 mb-6">
          Register to continue
        </p>

        <form onSubmit={handleRegister} className="space-y-4">

          <div>
            <label htmlFor="name" className="text-sm text-gray-300">
              Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="text-sm text-gray-300">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm text-gray-300">
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition font-semibold"
          >
            Register
          </button>

        </form>

        <p className="text-sm text-center mt-5 text-gray-300">
          Already have an account?{" "}
          <Link to="/" className="text-pink-400 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;