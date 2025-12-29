import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${id}`);
                setProduct(response.data);
            } catch (err) {
                setError('Error al cargar el producto');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Cargando producto...</p>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="text-6xl mb-4">😞</div>
                    <div className="text-red-500 text-xl font-semibold mb-4">{error || 'Producto no encontrado'}</div>
                    <button onClick={() => navigate('/categories')} className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700">
                        Ver Productos
                    </button>
                </div>
            </div>
        );
    }

    const stockStatus = product.stock > 0
        ? { text: `${product.stock} disponibles`, color: 'green', icon: '✓' }
        : { text: 'Agotado', color: 'red', icon: '✗' };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
            <div className="container mx-auto px-4">
                {/* Breadcrumb */}
                <div className="mb-8 flex items-center gap-2 text-sm">
                    <Link to="/" className="text-gray-500 hover:text-indigo-600 transition-colors">Inicio</Link>
                    <span className="text-gray-400">/</span>
                    <Link to="/categories" className="text-gray-500 hover:text-indigo-600 transition-colors">Productos</Link>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-900 font-medium">{product.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image Section */}
                    <div className="space-y-4">
                        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden group">
                            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                                {product.stock > 0 && (
                                    <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                        En Stock
                                    </span>
                                )}
                                {product.category && (
                                    <span className="bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                        {product.category}
                                    </span>
                                )}
                            </div>
                            <img
                                src={product.image_url || 'https://via.placeholder.com/600'}
                                alt={product.name}
                                className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                                {product.name}
                            </h1>

                            {/* Rating (placeholder) */}
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex text-yellow-400">
                                    {'★'.repeat(5)}
                                </div>
                                <span className="text-gray-600 text-sm">(4.8/5 - 127 reseñas)</span>
                            </div>

                            {/* Price */}
                            <div className="mb-6">
                                <div className="flex items-baseline gap-3">
                                    <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                                        ${product.price}
                                    </span>
                                    <span className="text-gray-500 line-through text-xl">${(product.price * 1.2).toFixed(2)}</span>
                                    <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                                        -17%
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="border-t border-b border-gray-200 py-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-3">Descripción</h3>
                            <p className="text-gray-700 leading-relaxed">{product.description}</p>
                        </div>

                        {/* Stock Status */}
                        <div className={`flex items-center gap-2 p-4 rounded-xl bg-${stockStatus.color}-50 border border-${stockStatus.color}-200`}>
                            <span className={`text-2xl text-${stockStatus.color}-600`}>{stockStatus.icon}</span>
                            <span className={`font-bold text-${stockStatus.color}-700`}>{stockStatus.text}</span>
                        </div>

                        {/* Quantity Selector */}
                        {product.stock > 0 && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Cantidad</label>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 font-bold text-xl transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="text-2xl font-bold w-16 text-center">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                            className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 font-bold text-xl transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={handleAddToCart}
                                        className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-8 rounded-full hover:shadow-2xl hover:shadow-indigo-500/50 hover:scale-105 active:scale-95 transition-all duration-300"
                                    >
                                        {addedToCart ? '✓ ¡Agregado!' : '🛒 Agregar al Carrito'}
                                    </button>
                                    <button className="flex-1 border-2 border-indigo-600 text-indigo-600 font-bold py-4 px-8 rounded-full hover:bg-indigo-50 transition-all duration-300">
                                        ❤️ Favoritos
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Features */}
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 space-y-3">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Beneficios</h3>
                            {['Envío gratis en compras mayores a $50', 'Garantía de 2 años', 'Devolución en 30 días', 'Soporte técnico 24/7'].map((feature, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
