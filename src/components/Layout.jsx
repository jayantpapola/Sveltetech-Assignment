import { Link, NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/reducers/authSlice";
import { setDarkMode } from "../redux/reducers/settingsSlice";
import Button from "./Button";
import { useState } from "react";

export default function Layout() {
  const dispatch = useDispatch();
  const dark = useSelector((s) => s.settings.darkMode);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (typeof document !== "undefined")
    document.documentElement.classList.toggle("dark", dark);

  const navClass = ({ isActive }) =>
    "block rounded-xl px-3 py-2 text-sm " +
    (isActive
      ? "bg-blue-600 text-white"
      : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800");

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-14 md:h-16 bg-white/80 backdrop-blur border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-800 flex items-center px-4 z-20">
        <div className="flex-1">
          <Link to="/dashboard" className="font-semibold text-lg">
            My Dashboard
          </Link>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={() => dispatch(setDarkMode(!dark))}
            className="text-sm"
          >
            Toggle Theme
          </button>
          <Link
            to="/settings"
            className="text-sm hover:underline hidden md:inline"
          >
            Settings
          </Link>
          <Button
            className="bg-gray-200 dark:bg-gray-800"
            onClick={() => dispatch(logout())}
          >
            Logout
          </Button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden px-2 py-1 border rounded"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-14 left-0 bottom-0 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-3 z-30
        transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0  md:top-16`}
      >
        <nav className="space-y-1">
          <NavLink to="/dashboard" className={navClass}>
            Dashboard
          </NavLink>
          <NavLink to="/users" className={navClass}>
            Users
          </NavLink>
          <NavLink to="/settings" className={navClass}>
            Settings
          </NavLink>
        </nav>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 md:hidden z-20"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 pt-14 md:pt-16 md:pl-64">
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
