import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
                <div className="mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">¡Pedido Confirmado!</h1>
                    <p className="text-gray-600">Gracias por tu compra</p>
                </div>

                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 mb-6">
                    <p className="text-gray-700 mb-4">
                        Tu pedido ha sido procesado exitosamente. Recibirás un correo electrónico con los detalles de tu compra y el número de seguimiento.
                    </p>
                    <div className="text-sm text-gray-600">
                        Número de pedido: <span className="font-bold text-indigo-600">#ORD-{Date.now().toString().slice(-8)}</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <Link
                        to="/categories"
                        className="block w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 px-6 rounded-full hover:shadow-xl hover:shadow-indigo-500/50 transition-all duration-300"
                    >
                        Seguir Comprando
                    </Link>
                    <Link
                        to="/"
                        className="block w-full border-2 border-gray-300 text-gray-700 font-bold py-3 px-6 rounded-full hover:bg-gray-50 transition-all duration-300"
                    >
                        Volver al Inicio
                    </Link>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                        ¿Necesitas ayuda? <a href="mailto:soporte@techstore.com" className="text-indigo-600 hover:underline">Contáctanos</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
