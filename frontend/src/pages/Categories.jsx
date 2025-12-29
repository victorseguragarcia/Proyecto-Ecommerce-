import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import { ProductGridSkeleton } from '../components/LoadingSkeleton';

const Categories = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Filters state
    const [category, setCategory] = useState(searchParams.get('category') || 'Todas');
    const [minPrice, setMinPrice] = useState(searchParams.get('min_price') || '');
    const [maxPrice, setMaxPrice] = useState(searchParams.get('max_price') || '');
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
    const [sortOption, setSortOption] = useState('newest');

    // Available categories (could be fetched from backend)
    const categories = ['Todas', 'Laptops', 'Tarjetas Gráficas', 'Procesadores', 'Periféricos'];

    useEffect(() => {
        // Update state from URL params when they change (e.g. from Navbar search)
        setSearchQuery(searchParams.get('q') || '');
        setCategory(searchParams.get('category') || 'Todas');
    }, [searchParams]);

    useEffect(() => {
        fetchProducts();
    }, [category, minPrice, maxPrice, searchQuery, sortOption]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = {};
            if (searchQuery) params.q = searchQuery;
            if (category !== 'Todas') params.category = category;
            if (minPrice) params.min_price = minPrice;
            if (maxPrice) params.max_price = maxPrice;

            // Sorting params
            switch (sortOption) {
                case 'price_asc':
                    params.sort_by = 'price';
                    params.order = 'asc';
                    break;
                case 'price_desc':
                    params.sort_by = 'price';
                    params.order = 'desc';
                    break;
                case 'name_asc':
                    params.sort_by = 'name';
                    params.order = 'asc';
                    break;
                case 'name_desc':
                    params.sort_by = 'name';
                    params.order = 'desc';
                    break;
                case 'newest':
                default:
                    params.sort_by = 'created_at';
                    params.order = 'desc';
                    break;
            }

            const response = await api.get('/products/', { params });
            setProducts(response.data);
        } catch (err) {
            setError('Error al cargar productos');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
        setSearchParams(prev => {
            if (newCategory === 'Todas') {
                prev.delete('category');
            } else {
                prev.set('category', newCategory);
            }
            return prev;
        });
    };

    const handlePriceFilter = (e) => {
        e.preventDefault();
        // Trigger fetch via useEffect dependency
        fetchProducts();
    };

    const clearFilters = () => {
        setCategory('Todas');
        setMinPrice('');
        setMaxPrice('');
        setSearchQuery('');
        setSortOption('newest');
        setSearchParams({});
    };

    return (
        <div className="container mx-auto px-4 py-8 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
                    {searchQuery ? `Resultados para "${searchQuery}"` : 'Nuestros Productos'}
                </h1>

                {/* Sort Dropdown */}
                <div className="flex items-center">
                    <label htmlFor="sort" className="mr-2 text-gray-700 font-medium">Ordenar por:</label>
                    <select
                        id="sort"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                        <option value="newest">Más Recientes</option>
                        <option value="price_asc">Precio: Menor a Mayor</option>
                        <option value="price_desc">Precio: Mayor a Menor</option>
                        <option value="name_asc">Nombre: A-Z</option>
                        <option value="name_desc">Nombre: Z-A</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters */}
                <div className="w-full md:w-1/4">
                    <div className="bg-white p-6 rounded-2xl shadow-lg mb-6 sticky top-24">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-800">Filtros</h3>
                            <button onClick={clearFilters} className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">Limpiar</button>
                        </div>

                        {/* Categories */}
                        <div className="mb-8">
                            <h4 className="font-semibold mb-3 text-gray-700 uppercase text-xs tracking-wider">Categorías</h4>
                            <ul className="space-y-2">
                                {categories.map(cat => (
                                    <li key={cat}>
                                        <button
                                            onClick={() => handleCategoryChange(cat)}
                                            className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${category === cat ? 'bg-blue-50 text-blue-700 font-bold shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
                                        >
                                            {cat}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Price Range */}
                        <div>
                            <h4 className="font-semibold mb-3 text-gray-700 uppercase text-xs tracking-wider">Precio</h4>
                            <form onSubmit={handlePriceFilter} className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    />
                                    <span className="text-gray-400">-</span>
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    />
                                </div>
                                <button type="submit" className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-bold shadow-md hover:shadow-lg">
                                    Aplicar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="w-full md:w-3/4">
                    {loading ? (
                        <ProductGridSkeleton count={6} />
                    ) : error ? (
                        <div className="text-center mt-10 text-red-500 font-semibold">{error}</div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                            {products.length === 0 && (
                                <div className="text-center text-gray-500 mt-10 py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                                    <p className="text-xl mb-2 font-medium">No se encontraron productos.</p>
                                    <p className="text-gray-400">Intenta ajustar tus filtros de búsqueda.</p>
                                    <button onClick={clearFilters} className="mt-4 text-blue-600 font-bold hover:underline">
                                        Limpiar todos los filtros
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Categories;
