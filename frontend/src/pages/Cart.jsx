import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="text-8xl mb-6">🛒</div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h2>
                    <p className="text-gray-600 mb-8">¡Descubre nuestros increíbles productos!</p>
                    <Link
                        to="/categories"
                        className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 px-8 rounded-full hover:shadow-xl hover:shadow-indigo-500/50 transition-all duration-300"
                    >
                        Explorar Productos
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Carrito de Compras</h1>
                    <p className="text-gray-600">{cart.length} {cart.length === 1 ? 'producto' : 'productos'}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item) => (
                            <div key={item.id} className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-6 hover:shadow-lg transition-shadow">
                                <img
                                    src={item.image_url || 'https://via.placeholder.com/150'}
                                    alt={item.name}
                                    className="w-full md:w-32 h-32 object-cover rounded-xl"
                                />

                                <div className="flex-grow">
                                    <Link to={`/product/${item.id}`} className="text-xl font-bold text-gray-900 hover:text-indigo-600 transition-colors block mb-2">
                                        {item.name}
                                    </Link>
                                    <p className="text-gray-600 text-sm mb-4">{item.category}</p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 font-bold transition-colors"
                                            >
                                                -
                                            </button>
                                            <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 font-bold transition-colors"
                                                disabled={item.quantity >= item.stock}
                                            >
                                                +
                                            </button>
                                            <span className="text-sm text-gray-500 ml-2">
                                                ({item.stock} disponibles)
                                            </span>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-500 hover:text-red-700 transition-colors"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="text-right md:text-left">
                                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                    <div className="text-sm text-gray-500">${item.price.toFixed(2)} c/u</div>
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={clearCart}
                            className="w-full md:w-auto text-red-500 hover:text-red-700 font-medium transition-colors mt-4"
                        >
                            Vaciar Carrito
                        </button>
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Resumen</h3>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-medium">${getCartTotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Envío</span>
                                    <span className="font-medium text-green-600">GRATIS</span>
                                </div>
                                <div className="border-t border-gray-200 pt-3 flex justify-between text-xl font-bold">
                                    <span>Total</span>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                                        ${getCartTotal().toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-6 rounded-full hover:shadow-2xl hover:shadow-indigo-500/50 hover:scale-105 active:scale-95 transition-all duration-300 mb-3"
                            >
                                Proceder al Pago
                            </button>

                            <Link
                                to="/categories"
                                className="block w-full text-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                            >
                                Seguir Comprando
                            </Link>

                            {/* Trust Badges */}
                            <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
                                {['🔒 Pago 100% Seguro', '🚚 Envío Rápido', '↩️ Devolución Gratis'].map((badge, index) => (
                                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                        <span>{badge}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
