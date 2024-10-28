import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "@/components/common/logo";
import { loginUser } from "@/store/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      console.log("Login successful:", result.payload);
      toast.success("Login successful!");
      navigate("/");
    } else if (loginUser.rejected.match(result)) {
      toast.error(result.payload || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-blue-900 to-cyan-500">
      <div className="bg-white rounded-lg shadow-lg w-8/12 max-w-md p-8">
        {/* Logo */}
        <div className="mb-5">
          <Logo />
        </div>

        {/* Email Input Form */}
        <form onSubmit={handleSubmit}>
          <label className="block text-gray-500 text-xs mb-2 font-inter">Your email</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
          <label className="block text-gray-500 text-xs mb-2 font-inter">Your password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
          <a className="font-inter text-xs text-right block underline mb-4">Forgot your password</a>

          {/* Submit button */}
          <button
            type="submit"
            className={`w-full py-2 px-4 font-inter font-semibold text-white rounded-full shadow ${
              email && password ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={!email || !password || loading}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        {error && <p className="text-red-500 text-xs mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
