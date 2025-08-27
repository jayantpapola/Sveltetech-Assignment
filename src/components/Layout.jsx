import { Link, NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/reducers/authSlice";
import { setDarkMode } from "../redux/reducers/settingsSlice";
import Button from "./Button";
import Modal from "./Modal"; // <-- import your modal
import { useState } from "react";

export default function Layout() {
  const dispatch = useDispatch();
  const dark = useSelector((s) => s.settings.darkMode);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

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
            Sveltetech Assignment
          </Link>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={() => dispatch(setDarkMode(!dark))}
            className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          >
            {dark ? "🌙 Dark" : "☀️ Light"}
          </button>

          {/* Logout Button */}
          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={() => setLogoutModalOpen(true)}
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
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:top-16`}
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

      {/* Logout Confirmation Modal */}
      <Modal
        open={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        title="Confirm Logout"
      >
        <p className="mb-4">Are you sure you want to logout?</p>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500 transition"
            onClick={() => setLogoutModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            onClick={() => {
              dispatch(logout());
              setLogoutModalOpen(false);
            }}
          >
            Logout
          </button>
        </div>
      </Modal>
    </div>
  );
}
