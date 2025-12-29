import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
            <div className="w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            TechStore
                        </h3>
                        <p className="text-sm leading-relaxed">
                            Tu tienda de confianza para tecnología de última generación. Calidad, precio y servicio excepcional.
                        </p>
                        <div className="flex space-x-4">
                            {['F', 'T', 'I', 'Y'].map((social, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                                >
                                    <span className="text-sm font-bold">{social}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-4">Enlaces Rápidos</h4>
                        <ul className="space-y-2">
                            {[
                                { name: 'Inicio', path: '/' },
                                { name: 'Productos', path: '/categories' },
                                { name: 'Ofertas', path: '/categories?sort_by=price&order=asc' },
                                { name: 'Contacto', path: '#' }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-sm hover:text-indigo-400 transition-colors"
                                    >
                                        → {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-white font-bold mb-4">Categorías</h4>
                        <ul className="space-y-2">
                            {['Laptops', 'Tarjetas Gráficas', 'Procesadores', 'Periféricos'].map((cat) => (
                                <li key={cat}>
                                    <Link
                                        to={`/categories?category=${cat}`}
                                        className="text-sm hover:text-purple-400 transition-colors"
                                    >
                                        → {cat}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-bold mb-4">Contacto</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href="mailto:soporte@techstore.com" className="hover:text-indigo-400 transition-colors">
                                    soporte@techstore.com
                                </a>
                            </li>
                            <li className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>123 Tech Street, Silicon Valley, CA 94000</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="border-t border-gray-700 pt-8 mb-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <h4 className="text-white font-bold mb-2">¿Quieres recibir ofertas exclusivas?</h4>
                        <p className="text-sm mb-4 text-gray-400">Suscríbete a nuestro boletín y obtén un 10% de descuento en tu primera compra</p>
                        <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="tu@email.com"
                                className="flex-grow px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-500"
                            />
                            <button className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 whitespace-nowrap">
                                Suscribirme
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                    <div className="text-gray-400">
                        © {currentYear} TechStore. Todos los derechos reservados.
                    </div>
                    <div className="flex flex-wrap justify-center gap-6">
                        {['Términos de Servicio', 'Política de Privacidad', 'Política de Devoluciones', 'Cookies'].map((link, index) => (
                            <a
                                key={index}
                                href="#"
                                className="text-gray-400 hover:text-indigo-400 transition-colors"
                            >
                                {link}
                            </a>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                        <span>Pagos:</span>
                        <div className="flex gap-1 text-lg">
                            <span>💳</span>
                            <span>🅿️</span>
                            <span>🏦</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
