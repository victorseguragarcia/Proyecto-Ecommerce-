import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import RevealOnScroll from '../components/RevealOnScroll';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products/');
                setProducts(response.data);
            } catch (err) {
                setError('Error al cargar productos');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mx-auto mb-4"></div>
                <p className="text-gray-600 font-medium">Cargando productos...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="text-center">
                <div className="text-6xl mb-4">😞</div>
                <div className="text-red-500 text-xl font-semibold">{error}</div>
                <button onClick={() => window.location.reload()} className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700">
                    Reintentar
                </button>
            </div>
        </div>
    );

    const featuredProducts = products.slice(-4).reverse();

    const categories = [
        { name: 'Laptops', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { name: 'Tarjetas Gráficas', image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { name: 'Procesadores', image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { name: 'Periféricos', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    ];

    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <div className="relative bg-gray-900 text-white overflow-hidden min-h-[600px] flex items-center">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 opacity-95"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center mix-blend-overlay opacity-20 animate-pulse" style={{ animationDuration: '8s' }}></div>

                {/* Floating Elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-bounce" style={{ animationDuration: '3s' }}></div>
                <div className="absolute bottom-32 right-20 w-32 h-32 bg-indigo-500/20 rounded-full blur-xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>

                <div className="relative container mx-auto px-4 py-20 text-center z-10">
                    <RevealOnScroll>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
                            Bienvenido a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-pulse">TechStore</span>
                        </h1>
                    </RevealOnScroll>
                    <RevealOnScroll delay={0.2}>
                        <p className="text-xl md:text-2xl mb-10 text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Descubre la última tecnología para llevar tu setup al siguiente nivel. <span className="text-indigo-300 font-semibold">Rendimiento, estilo y calidad</span> en un solo lugar.
                        </p>
                    </RevealOnScroll>
                    <RevealOnScroll delay={0.4}>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                to="/categories"
                                className="group inline-flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-10 rounded-full hover:shadow-2xl hover:shadow-indigo-500/50 hover:scale-105 active:scale-95 transition-all duration-300"
                            >
                                Explorar Catálogo
                                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                            <Link
                                to="/categories?sort_by=price&order=asc"
                                className="inline-flex items-center border-2 border-white/30 backdrop-blur-sm bg-white/10 text-white font-bold py-4 px-10 rounded-full hover:bg-white/20 hover:border-white/50 transition-all duration-300"
                            >
                                Ver Ofertas
                            </Link>
                        </div>
                    </RevealOnScroll>

                    {/* Stats */}
                    <RevealOnScroll delay={0.6}>
                        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                            <div>
                                <div className="text-3xl font-bold text-indigo-400">{products.length}+</div>
                                <div className="text-sm text-gray-400 mt-1">Productos</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-purple-400">24/7</div>
                                <div className="text-sm text-gray-400 mt-1">Soporte</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-pink-400">100%</div>
                                <div className="text-sm text-gray-400 mt-1">Garantía</div>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="py-20 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-30 -z-0"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <RevealOnScroll>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">¿Por qué elegirnos?</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">Ofrecemos más que productos, ofrecemos una experiencia completa</p>
                        </div>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { icon: '🚀', title: 'Envío Rápido', desc: 'Recibe tus productos en tiempo récord, garantizado.', color: 'indigo' },
                            { icon: '🛡️', title: 'Garantía Segura', desc: 'Compra con confianza, todos nuestros productos tienen garantía.', color: 'purple' },
                            { icon: '🎧', title: 'Soporte 24/7', desc: 'Nuestro equipo de expertos está siempre disponible para ti.', color: 'pink' }
                        ].map((item, index) => (
                            <RevealOnScroll key={index} delay={index * 0.15}>
                                <div className={`group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-${item.color}-200 relative overflow-hidden`}>
                                    <div className={`absolute top-0 right-0 w-32 h-32 bg-${item.color}-100 rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-0`}></div>
                                    <div className="relative z-10">
                                        <div className="text-6xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">{item.icon}</div>
                                        <h3 className="text-2xl font-bold mb-3 text-gray-800">{item.title}</h3>
                                        <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </div>

            {/* Shop by Category */}
            <div className="container mx-auto px-4 py-20">
                <RevealOnScroll>
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Explora por <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Categoría</span>
                        </h2>
                        <p className="text-gray-600">Encuentra exactamente lo que necesitas</p>
                    </div>
                </RevealOnScroll>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat, index) => (
                        <RevealOnScroll key={index} delay={index * 0.1}>
                            <Link
                                to={`/categories?category=${cat.name}`}
                                className="group relative block rounded-2xl overflow-hidden shadow-lg h-80 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                            >
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                                <div className="absolute inset-0 flex flex-col justify-end p-6">
                                    <h3 className="text-white text-2xl font-bold mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                        {cat.name}
                                    </h3>
                                    <div className="flex items-center text-indigo-300 text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                                        Ver Productos
                                        <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>

            {/* Featured Products */}
            <div className="py-20 bg-gradient-to-br from-gray-100 to-gray-50">
                <div className="container mx-auto px-4">
                    <RevealOnScroll>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
                            <div>
                                <h2 className="text-4xl font-bold text-gray-900 mb-2">Productos Destacados</h2>
                                <p className="text-gray-600">Lo más vendido de la semana</p>
                            </div>
                            <Link
                                to="/categories"
                                className="mt-4 md:mt-0 inline-flex items-center text-indigo-600 font-bold hover:text-indigo-800 transition-colors group"
                            >
                                Ver Todo
                                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map((product, index) => (
                            <RevealOnScroll key={product.id} delay={index * 0.1}>
                                <ProductCard product={product} />
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </div>

            {/* Newsletter Section */}
            <RevealOnScroll>
                <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-20 text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

                    <div className="container mx-auto px-4 text-center relative z-10">
                        <div className="text-5xl mb-6">📧</div>
                        <h2 className="text-4xl font-bold mb-4">Suscríbete a nuestro Boletín</h2>
                        <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
                            Recibe ofertas exclusivas, novedades y guías de compra directamente en tu bandeja de entrada
                        </p>
                        <div className="max-w-lg mx-auto">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    placeholder="tu@email.com"
                                    className="flex-grow px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/50 shadow-xl placeholder:text-gray-400"
                                />
                                <button className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition duration-300 shadow-xl hover:shadow-2xl active:scale-95 transform whitespace-nowrap">
                                    Suscribirme Ahora
                                </button>
                            </div>
                            <p className="text-sm text-white/70 mt-4">🔒 Tus datos están seguros con nosotros</p>
                        </div>
                    </div>
                </div>
            </RevealOnScroll>
        </div>
    );
};

export default Home;