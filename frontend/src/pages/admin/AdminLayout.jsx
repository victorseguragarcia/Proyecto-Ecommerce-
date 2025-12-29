import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';

const AdminLayout = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && (!user || !user.is_admin)) {
            navigate('/');
        }
    }, [user, loading, navigate]);

    if (loading) return <div>Cargando...</div>;

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white">
                <div className="p-4">
                    <h2 className="text-2xl font-bold">Panel Admin</h2>
                </div>
                <nav className="mt-4">
                    <Link to="/admin/products" className="block py-2 px-4 hover:bg-gray-700">Productos</Link>
                    <Link to="/admin/users" className="block py-2 px-4 hover:bg-gray-700">Usuarios</Link>
                    <Link to="/" className="block py-2 px-4 hover:bg-gray-700 mt-8 border-t border-gray-700">Volver a la Tienda</Link>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
