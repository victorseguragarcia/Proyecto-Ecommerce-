import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { useToast } from '../../context/ToastContext';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('Todas');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({ name: '', price: '', description: '', stock: '', image_url: '', category: '' });
    const [isEditing, setIsEditing] = useState(false);
    const { success, error: showError } = useToast();

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        filterProducts();
    }, [searchQuery, categoryFilter, products]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await api.get('/products/');
            setProducts(response.data);
            setFilteredProducts(response.data);
        } catch (error) {
            console.error('Error al cargar productos', error);
            showError('Error al cargar productos');
        } finally {
            setLoading(false);
        }
    };

    const filterProducts = () => {
        let filtered = [...products];

        // Filtro de búsqueda
        if (searchQuery) {
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filtro de categoría
        if (categoryFilter !== 'Todas') {
            filtered = filtered.filter(p => p.category === categoryFilter);
        }

        setFilteredProducts(filtered);
    };

    const handleDelete = async (id, name) => {
        if (window.confirm(`¿Estás seguro de eliminar "${name}"?`)) {
            try {
                await api.delete(`/admin/products/${id}`);
                success('Producto eliminado exitosamente');
                fetchProducts();
            } catch (error) {
                console.error('Error al eliminar producto', error);
                showError('Error al eliminar el producto');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await api.put(`/admin/products/${currentProduct.id}`, currentProduct);
                success('Producto actualizado exitosamente');
            } else {
                await api.post('/admin/products', currentProduct);
                success('Producto creado exitosamente');
            }
            setIsModalOpen(false);
            setCurrentProduct({ name: '', price: '', description: '', stock: '', image_url: '', category: '' });
            setIsEditing(false);
            fetchProducts();
        } catch (error) {
            console.error('Error al guardar producto', error);
            showError('Error al guardar el producto');
        }
    };

    const openEditModal = (product) => {
        setCurrentProduct(product);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const openAddModal = () => {
        setCurrentProduct({ name: '', price: '', description: '', stock: '', image_url: '', category: '' });
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const categories = ['Todas', ...new Set(products.map(p => p.category).filter(Boolean))];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Gestión de Productos</h1>
                    <p className="text-gray-600 mt-1">{filteredProducts.length} productos {searchQuery || categoryFilter !== 'Todas' ? 'filtrados' : 'totales'}</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl hover:shadow-green-500/50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Añadir Producto
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-grow">
                        <div className="relative">
                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Buscar productos por nombre o descripción..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="md:w-64">
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600"></div>
                </div>
            ) : filteredProducts.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
                    <div className="text-6xl mb-4">📦</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No hay productos</h3>
                    <p className="text-gray-600 mb-6">
                        {searchQuery || categoryFilter !== 'Todas'
                            ? 'No se encontraron productos con los filtros aplicados'
                            : 'Comienza añadiendo tu primer producto'}
                    </p>
                    {(searchQuery || categoryFilter !== 'Todas') && (
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setCategoryFilter('Todas');
                            }}
                            className="text-indigo-600 font-bold hover:underline"
                        >
                            Limpiar filtros
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onEdit={openEditModal}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {isEditing ? '✏️ Editar Producto' : '✨ Nuevo Producto'}
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-gray-700">Nombre *</label>
                                    <input
                                        type="text"
                                        value={currentProduct.name}
                                        onChange={e => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                        placeholder="ej: iPhone 15 Pro"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold mb-2 text-gray-700">Categoría</label>
                                    <input
                                        type="text"
                                        value={currentProduct.category}
                                        onChange={e => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="ej: Smartphones"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold mb-2 text-gray-700">Precio ($) *</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={currentProduct.price}
                                        onChange={e => setCurrentProduct({ ...currentProduct, price: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                        placeholder="999.99"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold mb-2 text-gray-700">Stock *</label>
                                    <input
                                        type="number"
                                        value={currentProduct.stock}
                                        onChange={e => setCurrentProduct({ ...currentProduct, stock: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                        placeholder="50"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2 text-gray-700">Descripción</label>
                                <textarea
                                    value={currentProduct.description}
                                    onChange={e => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    rows="4"
                                    placeholder="Descripción detallada del producto..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2 text-gray-700">URL de Imagen</label>
                                <input
                                    type="text"
                                    value={currentProduct.image_url}
                                    onChange={e => setCurrentProduct({ ...currentProduct, image_url: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="https://example.com/imagen.jpg"
                                />
                                {currentProduct.image_url && (
                                    <img
                                        src={currentProduct.image_url}
                                        alt="Preview"
                                        className="mt-3 w-32 h-32 object-cover rounded-xl border-2 border-gray-200"
                                        onError={(e) => e.target.style.display = 'none'}
                                    />
                                )}
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-xl font-medium transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-xl hover:shadow-indigo-500/50 transition-all"
                                >
                                    {isEditing ? 'Guardar Cambios' : 'Crear Producto'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

// Product Card Component
const ProductCard = ({ product, onEdit, onDelete }) => {
    const stockStatus = product.stock === 0 ? 'out' : product.stock < 10 ? 'low' : 'good';
    const stockColors = {
        out: 'bg-red-100 text-red-800 border-red-200',
        low: 'bg-orange-100 text-orange-800 border-orange-200',
        good: 'bg-green-100 text-green-800 border-green-200'
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-indigo-200">
            {/* Image */}
            <div className="relative h-48 bg-gray-100">
                <img
                    src={product.image_url || 'https://via.placeholder.com/400'}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />

                {/* Stock Badge */}
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold border-2 ${stockColors[stockStatus]}`}>
                    {stockStatus === 'out' ? '❌ Agotado' : `📦 Stock: ${product.stock}`}
                </div>

                {/* Category Badge */}
                {product.category && (
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-indigo-600">
                        {product.category}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                    {product.name}
                </h3>

                {/* Description */}
                {product.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                        {product.description}
                    </p>
                )}

                {/* Price */}
                <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                    ${product.price}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                    <button
                        onClick={() => onEdit(product)}
                        className="flex-1 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg font-medium hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Editar
                    </button>
                    <button
                        onClick={() => onDelete(product.id, product.name)}
                        className="flex-1 bg-red-50 text-red-700 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
