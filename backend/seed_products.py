from app import create_app
from extensions import db
from models import Product
import random

app = create_app()

def seed_products():
    categories = ['Laptops', 'Tarjetas Gráficas', 'Procesadores', 'Periféricos']
    
    # Data pools for generation
    adjectives = ['Potente', 'Rápido', 'Gaming', 'Profesional', 'Ultra', 'Económico', 'Compacto', 'Silencioso', 'RGB', 'Inalámbrico']
    brands = {
        'Laptops': ['Dell', 'HP', 'Lenovo', 'Asus', 'Acer', 'MSI', 'Apple'],
        'Tarjetas Gráficas': ['NVIDIA', 'AMD', 'ASUS', 'MSI', 'Gigabyte', 'EVGA'],
        'Procesadores': ['Intel', 'AMD'],
        'Periféricos': ['Logitech', 'Razer', 'Corsair', 'HyperX', 'SteelSeries']
    }
    models = {
        'Laptops': ['XPS 15', 'Spectre x360', 'ThinkPad X1', 'ROG Zephyrus', 'Predator Helios', 'MacBook Pro'],
        'Tarjetas Gráficas': ['RTX 4090', 'RX 7900 XTX', 'RTX 4070', 'RX 7800 XT', 'GTX 1660 Super'],
        'Procesadores': ['Core i9-13900K', 'Ryzen 9 7950X', 'Core i7-13700K', 'Ryzen 7 7800X3D'],
        'Periféricos': ['Mouse G Pro', 'Teclado BlackWidow', 'Headset Cloud II', 'Mouse Viper', 'Teclado K70']
    }
    
    images = {
        'Laptops': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        'Tarjetas Gráficas': 'https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        'Procesadores': 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        'Periféricos': 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }

    with app.app_context():
        print("Eliminando productos existentes...")
        # Optional: Clear existing products
        # Product.query.delete()
        
        print("Generando productos...")
        for category in categories:
            print(f"Creando productos para: {category}")
            for i in range(20):
                brand = random.choice(brands[category])
                model = random.choice(models[category])
                adj = random.choice(adjectives)
                
                name = f"{brand} {model} {adj}"
                price = round(random.uniform(50, 3000), 2)
                stock = random.randint(0, 50)
                description = f"Este es un excelente {category.lower()[:-1]} para todas tus necesidades. Cuenta con características {adj.lower()}s."
                
                product = Product(
                    name=name,
                    description=description,
                    price=price,
                    stock=stock,
                    image_url=images[category],
                    category=category
                )
                db.session.add(product)
        
        db.session.commit()
        print("¡Productos generados exitosamente!")

if __name__ == '__main__':
    seed_products()
