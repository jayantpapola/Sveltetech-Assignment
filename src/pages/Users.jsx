// src/pages/Users.jsx
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUsers,
  deleteUser,
  updateUser,
} from "../redux/reducers/usersSlice";
import toast from "react-hot-toast";
import Input from "../components/Input";
import Modal from "../components/Modal";

export default function Users() {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.users);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const itemsPerPage = 4;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  // useMemo to avoid unnecessary recomputations
  const filteredUsers = useMemo(
    () =>
      list.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      ),
    [list, search]
  );

  const totalPages = useMemo(
    () => Math.ceil(filteredUsers.length / itemsPerPage),
    [filteredUsers.length]
  );

  const displayedUsers = useMemo(
    () =>
      filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [filteredUsers, currentPage]
  );

  // Handlers
  const openEditModal = useCallback((user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email });
  }, []);

  const handleEditSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(updateUser({ ...editingUser, ...formData }));
      setEditingUser(null);
      toast.success("User updated successfully!");
    },
    [dispatch, editingUser, formData]
  );

  // Loading State
  if (status === "loading")
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p className="animate-pulse text-gray-500 dark:text-gray-400">
          Loading users...
        </p>
      </div>
    );

  // Error + Retry State
  if (status === "failed")
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
        <p className="text-red-500 font-medium">⚠ {error}</p>
        <button
          onClick={() => dispatch(fetchUsers())}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Users</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // reset to first page when searching
          }}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 outline-none"
        />
      </div>

      {/* Users List */}
      <ul className="space-y-3">
        {displayedUsers.map((user) => (
          <li
            key={user.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl shadow hover:shadow-md transition"
          >
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user.email}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => openEditModal(user)}
                className="px-3 py-1 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  dispatch(deleteUser(user.id));
                  toast.success("User Deleted successfully!");
                }}
                className="px-3 py-1 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Edit Modal */}

      <Modal
        open={!!editingUser}
        onClose={() => setEditingUser(null)}
        title="Edit User"
      >
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <Input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setEditingUser(null)}
              className="px-4 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
