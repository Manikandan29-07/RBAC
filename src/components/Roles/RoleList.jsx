import React, { useState, useEffect } from "react";
import { createRole, updateRole, deleteRole, getRoles } from "../../api"; // Make sure your API functions are implemented

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState({ name: "", permissions: [] });
  const [editingRole, setEditingRole] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchRolesData();
  }, []);

  const fetchRolesData = async () => {
    const data = await getRoles();
    setRoles(data);
  };

  const handleAddRole = () => {
    setIsModalOpen(true);
    setNewRole({ name: "", permissions: [] });
  };

  const handleEditRole = (role) => {
    setEditingRole(role);
    setNewRole({ ...role });
    setIsModalOpen(true);
  };

  const handleDeleteRole = async (roleId) => {
    await deleteRole(roleId);
    fetchRolesData();
  };

  const handleSave = async () => {
    try {
      if (editingRole) {
        await updateRole(editingRole.id, newRole);
      } else {
        await createRole(newRole);
      }
      setNewRole({ name: "", permissions: [] });
      setIsModalOpen(false);
      fetchRolesData();
    } catch (error) {
      console.error("Error saving role:", error);
    }
  };

  const handleCancel = () => {
    setNewRole({ name: "", permissions: [] });
    setEditingRole(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2>Role Management</h2>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleAddRole}
      >
        Add Role
      </button>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Role Name</th>
            <th className="border p-2">Permissions</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td className="border p-2">{role.name}</td>
              <td className="border p-2">{role.permissions.join(", ")}</td>
              <td className="border p-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleEditRole(role)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDeleteRole(role.id)}
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
              {editingRole ? "Edit Role" : "Add Role"}
            </h3>

            {/* Role Form */}
            <div>
              <input
                className="border p-2 mb-2 w-full"
                type="text"
                placeholder="Role Name"
                value={newRole.name}
                onChange={(e) =>
                  setNewRole({ ...newRole, name: e.target.value })
                }
              />
              <input
                className="border p-2 mb-2 w-full"
                type="text"
                placeholder="Permissions (comma separated)"
                value={newRole.permissions.join(", ")}
                onChange={(e) =>
                  setNewRole({
                    ...newRole,
                    permissions: e.target.value.split(","),
                  })
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

export default RoleList;
