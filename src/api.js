// src/api.js
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Editor",
    status: "Inactive",
  },
];

const mockRoles = [
  { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
  { id: 2, name: "Editor", permissions: ["Read", "Write"] },
];

export const getUsers = () => Promise.resolve([...mockUsers]);

export const updateUser = (id, updatedUser) => {
  const index = mockUsers.findIndex((u) => u.id === id);
  if (index > -1) {
    mockUsers[index] = { ...mockUsers[index], ...updatedUser };
    return Promise.resolve(mockUsers[index]);
  }
  return Promise.reject("User not found");
};

export const deleteUser = (id) => {
  const index = mockUsers.findIndex((u) => u.id === id);
  if (index > -1) {
    mockUsers.splice(index, 1);
    return Promise.resolve(true);
  }
  return Promise.reject("User not found");
};

export const getRoles = () => Promise.resolve([...mockRoles]);

export const updateRole = (id, updatedRole) => {
  const index = mockRoles.findIndex((r) => r.id === id);
  if (index > -1) {
    mockRoles[index] = { ...mockRoles[index], ...updatedRole };
    return Promise.resolve(mockRoles[index]);
  }
  return Promise.reject("Role not found");
};

export const deleteRole = (id) => {
  const index = mockRoles.findIndex((r) => r.id === id);
  if (index > -1) {
    mockRoles.splice(index, 1);
    return Promise.resolve(true);
  }
  return Promise.reject("Role not found");
};

export const createUser = (user) => {
  // Assign a new id to the user (mock behavior)
  const newUser = { ...user, id: mockUsers.length + 1 };
  mockUsers.push(newUser);
  return Promise.resolve(newUser); // Return the new user
};

// Mock function to create a role
export const createRole = (role) => {
  // Assign a new id to the role (mock behavior)
  const newRole = { ...role, id: mockRoles.length + 1 };
  mockRoles.push(newRole);
  return Promise.resolve(newRole); // Return the new role
};
