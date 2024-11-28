import React, { useState, useEffect } from "react";
import { createUser, updateUser, deleteUser, getUsers } from "../../api"; // Make sure your API functions are implemented

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    status: "Active",
  });
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleAddUser = () => {
    setIsModalOpen(true);
    setNewUser({ name: "", email: "", role: "", status: "Active" });
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({ ...user });
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (userId) => {
    await deleteUser(userId);
    fetchUsersData();
  };

  const handleSave = async () => {
    try {
      if (editingUser) {
        await updateUser(editingUser.id, newUser);
      } else {
        await createUser(newUser);
      }
      setNewUser({ name: "", email: "", role: "", status: "Active" });
      setIsModalOpen(false);
      fetchUsersData();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleCancel = () => {
    setNewUser({ name: "", email: "", role: "", status: "Active" });
    setEditingUser(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2>User Management</h2>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleAddUser}
      >
        Add User
      </button>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2">{user.status}</td>
              <td className="border p-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleEditUser(user)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h3 className="text-xl font-bold mb-4">
              {editingUser ? "Edit User" : "Add User"}
            </h3>

            {/* User Form */}
            <div>
              <input
                className="border p-2 mb-2 w-full"
                type="text"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
              <input
                className="border p-2 mb-2 w-full"
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
              <input
                className="border p-2 mb-2 w-full"
                type="text"
                placeholder="Role"
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
