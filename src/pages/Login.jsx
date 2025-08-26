import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { loginSuccess } from "../redux/reducers/authSlice";
import Input from "@/components/Input";
import Button from "@/components/Button";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const loc = useLocation();

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (email === "admin@example.com" && password === "admin123") {
        dispatch(loginSuccess({ user: { email }, token: "mock-token" }));
        toast.success("Logged in");
        nav(loc?.state?.from?.pathname || "/dashboard", { replace: true });
      } else {
        toast.error("Invalid credentials");
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-950">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-lg 
                   dark:border-gray-800 dark:bg-gray-900"
      >
        <h1 className="mb-4 text-xl font-semibold text-black dark:text-white">
          Login
        </h1>
        <div className="space-y-3">
          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white dark:bg-gray-800 text-black dark:text-white 
                         border-gray-300 dark:border-gray-600 
                         placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
              Password
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-white dark:bg-gray-800 text-black dark:text-white 
                         border-gray-300 dark:border-gray-600 
                         placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white hover:bg-blue-700 
                       disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Use <b>admin@example.com</b> / <b>admin123</b>
          </p>
        </div>
      </form>
    </div>
  );
}
