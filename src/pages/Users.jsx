// src/pages/Users.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUsers,
  deleteUser,
  updateUser,
} from "../redux/reducers/usersSlice";

export default function Users() {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.users);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const itemsPerPage = 5;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const filteredUsers = list.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle edit modal open
  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email });
  };

  // Handle edit submit
  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ ...editingUser, ...formData }));
    setEditingUser(null);
  };

  if (status === "loading") return <p className="p-4">Loading...</p>;
  if (status === "failed") return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded w-full 
             bg-white dark:bg-gray-800 
             text-black dark:text-white 
             border-gray-300 dark:border-gray-600"
      />

      {/* Users List */}
      <ul className="space-y-2">
        {displayedUsers.map((user) => (
          <li
            key={user.id}
            className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg shadow"
          >
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <div className="space-x-2">
              <button
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
                onClick={() => openEditModal(user)}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 text-sm bg-red-500 text-white rounded"
                onClick={() => dispatch(deleteUser(user.id))}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="mb-4 p-2 border rounded w-full 
             bg-white dark:bg-gray-800 
             text-black dark:text-white 
             border-gray-300 dark:border-gray-600"
              />
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="mb-4 p-2 border rounded w-full 
             bg-white dark:bg-gray-800 
             text-black dark:text-white 
             border-gray-300 dark:border-gray-600"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-3 py-1 bg-gray-400 text-white rounded"
                  onClick={() => setEditingUser(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-green-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
