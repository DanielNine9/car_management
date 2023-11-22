import React, { useState, useEffect, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteUser, getUsers, updateUser } from '../../redux/apiRequest';
import Loading from '../Loading';

interface updateUserType {
    banned?: boolean,
    role?: string
}

function UserManagement() {
    useEffect(() => {
        if (currentUser?.role !== "ADMIN") {
            navigate("/forbidden")
        }
        getAllUser()

    }, [])

    const currentUser = useSelector((state: any) => state?.auth?.login?.currentUser)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const getAllUser = async () => {
        setLoading(true)
        const res = await getUsers(currentUser?.access_token, navigate)
        setLoading(false)
        const users = res?.data
        setUsers(users)
    }






    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState<boolean>(false)

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [editableUserId, setEditableUserId] = useState<number | null>(null);


    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleUsers = users.slice(startIndex, endIndex);


    const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState<number | null>(null);


    const [editUser, setEditUser] = useState<updateUserType>({});

    const [roleEdit, setRoleEdit] = useState<null | string>(null)



    if (loading) {
        return (<>
            <Loading />
        </>)
    }

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const setUserValue = (field: string, value: string | boolean) => {
        setEditUser({ ...editUser, [field]: value });
        if (field == "role") {
            setRoleEdit(value as string)
        }
    };

    const handleEditUser = (userId: number, role: string) => {
        setEditableUserId(userId);
        setRoleEdit(role)
    };

    const handleSaveUser = async (userId: number): Promise<void> => {
        await updateUser(editUser, userId, currentUser.access_token, navigate)
        setEditableUserId(null);
        getAllUser()
    };

    const handleDeleteUser = (userId: number): void => {
        setDeleteConfirmationOpen(true)
        setDeleteUserId(userId)
    };

    function cancelDelete(): void {
        setDeleteConfirmationOpen(false)
    }

    function confirmDelete(): void {
        try {
            const res = deleteUser(deleteUserId as number, currentUser.access_token, navigate)
            getAllUser()
            setDeleteConfirmationOpen(false)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="p-4">
            <Link to="/">Home</Link>
            <h2 className="text-2xl font-semibold mb-4">User Management</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="py-2 text-center">ID</th>
                        <th className="py-2 text-center">Username</th>
                        <th className="py-2 text-center">Email</th>
                        <th className="py-2 text-center">Address</th>
                        <th className="py-2 text-center">Role</th>
                        <th className="py-2 text-center">Banned</th>
                        <th className="py-2 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {visibleUsers?.sort((a: any, b: any) => a.id - b.id)?.map((user: any) => (
                        <tr key={user.id} className="border-t">
                            <td className="py-4 text-center">{user.id}</td>
                            <td className="py-4 text-center">
                                {user.username}
                            </td>
                            <td className="py-4 text-center">

                                {user.email}
                            </td>
                            <td className="py-4 text-center">
                                {user.address}
                            </td>
                            <td className={`py-4 text-center`}>
                                {editableUserId === user.id ? (
                                    <select name="role" value={roleEdit as string} onChange={e => setUserValue('role', e.target.value)}>
                                        <option value="ADMIN">ADMIN</option>
                                        <option value="SELLER">SELLER</option>
                                        <option value="BUYER">BUYER</option>
                                    </select>
                                ) : (
                                    user.role
                                )}
                            </td>
                            <td className="py-4 text-center">
                                {editableUserId === user.id ? (
                                    <select onChange={e => setUserValue('banned', e.target.value === 'true')}>
                                        {user.banned ? <>
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </> : <>
                                            <option value="false">No</option>
                                            <option value="true">Yes</option>
                                        </>}

                                    </select>
                                ) : (
                                    user.banned ? 'Yes' : 'No'
                                )}

                            </td>
                            <td className="py-4 text-center flex justify-center items-center">
                                {editableUserId === user.id ? (
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                                        onClick={() => handleSaveUser(user.id)}
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                                        onClick={() => handleEditUser(user.id, user.role)}
                                    >
                                        Edit
                                    </button>
                                )}
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded ml-2"
                                    onClick={() => handleDeleteUser(user.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4 flex justify-center">
                {Array.from({ length: Math.ceil(users.length / itemsPerPage) }, (_, index) => (
                    <button
                        key={index}
                        className={`mx-2 px-3 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'
                            }`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            {isDeleteConfirmationOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="bg-white p-4 rounded shadow-md">
                        <p className="text-lg font-semibold mb-2">Are you sure you want to delete this product?</p>
                        <div className="flex justify-between mt-4">
                            <button className="px-4 py-1 bg-gray-400 text-white" onClick={() => cancelDelete()}>Cancel</button>
                            <button className="px-4 py-1 bg-red-600 text-white" onClick={() => confirmDelete()}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserManagement;
