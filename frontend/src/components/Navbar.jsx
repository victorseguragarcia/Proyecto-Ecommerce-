import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { getCartCount } = useCart();
    const [searchTerm, setSearchTerm] = useState('');
    const [showCartPreview, setShowCartPreview] = useState(false);
    const navigate = useNavigate();
    const cartCount = getCartCount();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/categories?q=${encodeURIComponent(searchTerm)}`);
            setSearchTerm('');
        }
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center py-4 gap-4">
                    <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        TechStore
                    </Link>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="w-full md:w-1/3">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Buscar productos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                            <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </form>

                    <div className="flex items-center gap-6">
                        <Link to="/" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                            Inicio
                        </Link>
                        <Link to="/categories" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                            Productos
                        </Link>

                        {/* Cart Icon */}
                        <div className="relative" onMouseEnter={() => setShowCartPreview(true)} onMouseLeave={() => setShowCartPreview(false)}>
                            <Link
                                to="/cart"
                                className="relative inline-flex items-center text-gray-700 hover:text-indigo-600 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            {/* Cart Preview Tooltip */}
                            {showCartPreview && cartCount > 0 && (
                                <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-2xl p-3 w-64 border border-gray-100">
                                    <div className="text-sm font-bold text-gray-900 mb-2">
                                        {cartCount} {cartCount === 1 ? 'producto' : 'productos'} en el carrito
                                    </div>
                                    <Link
                                        to="/cart"
                                        className="block w-full bg-indigo-600 text-white text-center py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                                    >
                                        Ver Carrito
                                    </Link>
                                </div>
                            )}
                        </div>

                        {user ? (
                            <>
                                {user.is_admin && (
                                    <Link to="/admin/products" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                                        Admin
                                    </Link>
                                )}
                                <span className="text-gray-700 font-medium">Hola, {user.username}</span>
                                <button
                                    onClick={logout}
                                    className="text-red-600 hover:text-red-700 font-medium transition-colors"
                                >
                                    Salir
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                                    Entrar
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 font-medium"
                                >
                                    Registrarse
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
