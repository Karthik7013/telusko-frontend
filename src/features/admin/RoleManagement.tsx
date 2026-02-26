import React, { useState, useEffect } from 'react';
import {
    useGetRolesQuery,
    useCreateRoleMutation,
    useUpdateRoleMutation,
    useDeleteRoleMutation,
} from '../admin/adminApi';
import { Role } from '../../types/role';

const RoleManagement = () => {
    const [roles, setRoles] = useState<Role[]>([]);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        permissions: [] as string[],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const { data: rolesData, isLoading: rolesLoading, refetch } = useGetRolesQuery();
    const [createRole, { isLoading: createLoading }] = useCreateRoleMutation();
    const [updateRole, { isLoading: updateLoading }] = useUpdateRoleMutation();
    const [deleteRole, { isLoading: deleteLoading }] = useDeleteRoleMutation();

    useEffect(() => {
        if (rolesData) {
            setRoles(rolesData);
        }
    }, [rolesData]);

    const handleSelectRole = (role: Role) => {
        setSelectedRole(role);
        setFormData({
            name: role.name,
            description: role.description,
            permissions: role.permissions,
        });
        setIsEditing(true);
    };

    const handleCreateNew = () => {
        setSelectedRole(null);
        setFormData({
            name: '',
            description: '',
            permissions: [],
        });
        setIsEditing(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            if (isEditing && selectedRole) {
                await updateRole({
                    id: selectedRole.id,
                    data: formData,
                });
                setSuccess('Role updated successfully!');
            } else {
                await createRole(formData);
                setSuccess('Role created successfully!');
            }
            setIsEditing(false);
            setSelectedRole(null);
            setFormData({
                name: '',
                description: '',
                permissions: [],
            });
            refetch();
        } catch (err: any) {
            setError(err?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (roleId: number) => {
        if (window.confirm('Are you sure you want to delete this role?')) {
            setLoading(true);
            setError(null);
            try {
                await deleteRole(roleId);
                setSuccess('Role deleted successfully!');
                refetch();
                if (selectedRole?.id === roleId) {
                    setSelectedRole(null);
                    setIsEditing(false);
                }
            } catch (err: any) {
                setError(err?.data?.message || 'Failed to delete role');
            } finally {
                setLoading(false);
            }
        }
    };

    const handlePermissionChange = (permission: string) => {
        const currentPermissions = formData.permissions;
        if (currentPermissions.includes(permission)) {
            setFormData({
                ...formData,
                permissions: currentPermissions.filter((p) => p !== permission),
            });
        } else {
            setFormData({
                ...formData,
                permissions: [...currentPermissions, permission],
            });
        }
    };

    if (rolesLoading) {
        return <div>Loading roles...</div>;
    }

    return (
        <div className="role-management">
            <h2>Role Management</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <div className="role-management-grid">
                <div className="role-list">
                    <div className="role-list-header">
                        <h3>Roles ({roles.length})</h3>
                        <button onClick={handleCreateNew} className="btn-primary">
                            Create New Role
                        </button>
                    </div>
                    <ul className="role-items">
                        {roles.map((role) => (
                            <li
                                key={role.id}
                                className={`role-item ${selectedRole?.id === role.id ? 'selected' : ''}`}
                                onClick={() => handleSelectRole(role)}
                            >
                                <div className="role-info">
                                    <h4>{role.name}</h4>
                                    <p>{role.description}</p>
                                    <div className="role-permissions">
                                        {role.permissions.map((perm) => (
                                            <span key={perm} className="permission-tag">
                                                {perm}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(role.id);
                                    }}
                                    disabled={deleteLoading}
                                    className="btn-danger"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="role-form">
                    <h3>{isEditing ? (selectedRole ? 'Edit Role' : 'Create Role') : 'Select a Role'}</h3>
                    {isEditing ? (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Role Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Permissions</label>
                                <div className="permissions-list">
                                    {['READ', 'WRITE', 'DELETE', 'ADMIN'].map((permission) => (
                                        <label key={permission} className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                checked={formData.permissions.includes(permission)}
                                                onChange={() => handlePermissionChange(permission)}
                                            />
                                            {permission}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="form-actions">
                                <button
                                    type="submit"
                                    disabled={loading || createLoading || updateLoading}
                                    className="btn-primary"
                                >
                                    {loading ? 'Saving...' : isEditing ? 'Update Role' : 'Create Role'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setSelectedRole(null);
                                    }}
                                    className="btn-secondary"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <p>Select a role from the list to edit, or create a new one.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RoleManagement;