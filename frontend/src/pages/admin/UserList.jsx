import { useState, useEffect } from 'react';
import api from '../../api/axios';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await api.get('/admin/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
            setError(error.response?.data?.message || 'Error al cargar usuarios');
        } finally {
            setLoading(false);
        }
    };

    const toggleAdmin = async (user) => {
        try {
            await api.put(`/admin/users/${user.id}`, { is_admin: !user.is_admin });
            fetchUsers();
        } catch (error) {
            console.error('Error al actualizar rol de usuario:', error);
            alert('Error al actualizar el rol del usuario');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
            try {
                await api.delete(`/admin/users/${id}`);
                fetchUsers();
            } catch (error) {
                console.error('Error al eliminar usuario:', error);
                alert('Error al eliminar el usuario');
            }
        }
    };

    const adminUsers = users.filter(user => user.is_admin);
    const regularUsers = users.filter(user => !user.is_admin);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <div className="flex items-center">
                    <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                        <p className="text-red-700 font-medium">{error}</p>
                        <button onClick={fetchUsers} className="text-red-600 hover:text-red-800 underline text-sm mt-1">
                            Reintentar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
                    <p className="text-gray-600 mt-1">{users.length} usuarios totales ({adminUsers.length} admins, {regularUsers.length} usuarios)</p>
                </div>
                <button onClick={fetchUsers} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Actualizar
                </button>
            </div>

            {users.length === 0 ? (
                <div className="bg-gray-50 rounded-2xl p-12 text-center">
                    <div className="text-6xl mb-4">👥</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No hay usuarios</h3>
                    <p className="text-gray-600">Crea algunos usuarios para poder gestionarlos aquí.</p>
                </div>
            ) : (
                <>
                    {/* Administradores */}
                    {adminUsers.length > 0 && (
                        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-200">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Administradores ({adminUsers.length})</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {adminUsers.map(user => (
                                    <UserCard key={user.id} user={user} onToggleAdmin={toggleAdmin} onDelete={handleDelete} isAdmin={true} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Usuarios Normales */}
                    {regularUsers.length > 0 && (
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Usuarios ({regularUsers.length})</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {regularUsers.map(user => (
                                    <UserCard key={user.id} user={user} onToggleAdmin={toggleAdmin} onDelete={handleDelete} isAdmin={false} />
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

// Componente de tarjeta de usuario
const UserCard = ({ user, onToggleAdmin, onDelete, isAdmin }) => {
    return (
        <div className={`rounded-xl p-4 border-2 transition-all duration-300 hover:shadow-lg ${isAdmin ? 'bg-white border-purple-300' : 'bg-gray-50 border-gray-300'}`}>
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 flex-grow">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${isAdmin ? 'bg-gradient-to-r from-purple-600 to-indigo-600' : 'bg-gray-600'}`}>
                        {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-grow">
                        <h3 className="font-bold text-gray-900">{user.username}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${isAdmin ? 'bg-purple-100 text-purple-800' : 'bg-gray-200 text-gray-700'}`}>
                                {isAdmin ? '👑 Admin' : '👤 Usuario'}
                            </span>
                            <span className="text-xs text-gray-400">
                                ID: {user.id}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 flex gap-2">
                <button
                    onClick={() => onToggleAdmin(user)}
                    className={`flex-1 px-3 py-2 rounded-lg font-medium text-sm transition-all ${isAdmin
                        ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                >
                    {isAdmin ? '↓ Quitar Admin' : '↑ Hacer Admin'}
                </button>
                <button
                    onClick={() => onDelete(user.id)}
                    className="px-3 py-2 bg-red-100 text-red-700 rounded-lg font-medium text-sm hover:bg-red-200 transition-all"
                >
                    🗑️ Eliminar
                </button>
            </div>
        </div>
    );
};

export default UserList;
