import React, { useState } from "react";

function UserForm({ onSave }) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(user);
    setUser({ name: "", email: "", role: "", status: "Active" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-bold mb-4">Add/Edit User</h3>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          className="w-full border px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          className="w-full border px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Role</label>
        <input
          type="text"
          name="role"
          value={user.role}
          onChange={handleChange}
          className="w-full border px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Status</label>
        <select
          name="status"
          value={user.status}
          onChange={handleChange}
          className="w-full border px-3 py-2"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </form>
  );
}

export default UserForm;
