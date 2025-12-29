import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { success } = useToast();
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [showQuickView, setShowQuickView] = useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product, 1);
        success(`${product.name} agregado al carrito`);
    };

    const toggleWishlist = (e) => {
        e.preventDefault();
        setIsWishlisted(!isWishlisted);
        success(isWishlisted ? 'Eliminado de favoritos' : 'Agregado a favoritos');
    };

    const isNew = () => {
        const createdDate = new Date(product.created_at);
        const daysSinceCreated = (Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24);
        return daysSinceCreated < 7;
    };

    const discountPercentage = 15; // Simulado

    return (
        <div className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            {/* Badges */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                {isNew() && (
                    <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        ✨ Nuevo
                    </span>
                )}
                {discountPercentage > 0 && (
                    <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        -{discountPercentage}%
                    </span>
                )}
            </div>

            {/* Wishlist Button */}
            <button
                onClick={toggleWishlist}
                className="absolute top-3 right-3 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-200"
            >
                <svg
                    className={`w-5 h-5 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                    fill={isWishlisted ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </button>

            <Link to={`/product/${product.id}`} className="block">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-gray-100">
                    <img
                        src={product.image_url || 'https://via.placeholder.com/400'}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Quick View Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setShowQuickView(true);
                            }}
                            className="bg-white text-gray-900 px-6 py-2 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                        >
                            👁️ Vista Rápida
                        </button>
                    </div>

                    {/* Stock Badge */}
                    {product.stock < 5 && product.stock > 0 && (
                        <div className="absolute bottom-3 left-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                            ¡Solo {product.stock} disponibles!
                        </div>
                    )}
                    {product.stock === 0 && (
                        <div className="absolute bottom-3 left-3 bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full">
                            Agotado
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Category */}
                    {product.category && (
                        <span className="text-xs text-indigo-600 font-semibold uppercase tracking-wide">
                            {product.category}
                        </span>
                    )}

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mt-2 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                        {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                        ))}
                        <span className="text-xs text-gray-500 ml-1">(4.8)</span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                        {product.description}
                    </p>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                                ${product.price}
                            </div>
                            {discountPercentage > 0 && (
                                <div className="text-sm text-gray-400 line-through">
                                    ${(product.price / (1 - discountPercentage / 100)).toFixed(2)}
                                </div>
                            )}
                        </div>

                        {product.stock > 0 && (
                            <button
                                onClick={handleAddToCart}
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-full hover:shadow-lg hover:shadow-indigo-500/50 hover:scale-110 active:scale-95 transition-all duration-200"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
