import React from "react";

function PermissionManager({ permissions, onChange }) {
  const allPermissions = ["Read", "Write", "Delete"];

  const handleToggle = (perm) => {
    if (permissions.includes(perm)) {
      onChange(permissions.filter((p) => p !== perm));
    } else {
      onChange([...permissions, perm]);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Manage Permissions</h3>
      <div className="flex gap-4">
        {allPermissions.map((perm) => (
          <label key={perm}>
            <input
              type="checkbox"
              checked={permissions.includes(perm)}
              onChange={() => handleToggle(perm)}
            />
            {perm}
          </label>
        ))}
      </div>
    </div>
  );
}

export default PermissionManager;
