from app import create_app
from extensions import db
from models import User
from werkzeug.security import generate_password_hash

app = create_app()

def seed_users():
    with app.app_context():
        print("Creando usuarios de prueba...")
        
        # Verificar si ya existen
        existing_admin = User.query.filter_by(email='admin@techstore.com').first()
        existing_user = User.query.filter_by(email='usuario@techstore.com').first()
        
        if existing_admin:
            print("⚠️ El usuario admin ya existe")
        else:
            # Crear usuario administrador
            admin = User(
                username='admin',
                email='admin@techstore.com',
                password_hash=generate_password_hash('admin123'),
                is_admin=True
            )
            db.session.add(admin)
            print("✓ Usuario administrador creado:")
            print("  Email: admin@techstore.com")
            print("  Password: admin123")
        
        if existing_user:
            print("⚠️ El usuario normal ya existe")
        else:
            # Crear usuario normal
            user = User(
                username='usuario',
                email='usuario@techstore.com',
                password_hash=generate_password_hash('user123'),
                is_admin=False
            )
            db.session.add(user)
            print("✓ Usuario normal creado:")
            print("  Email: usuario@techstore.com")
            print("  Password: user123")
        
        # Crear usuarios adicionales
        additional_users = [
            {'username': 'maria_garcia', 'email': 'maria@example.com', 'password': 'maria123', 'is_admin': False},
            {'username': 'juan_perez', 'email': 'juan@example.com', 'password': 'juan123', 'is_admin': False},
            {'username': 'moderador', 'email': 'mod@techstore.com', 'password': 'mod123', 'is_admin': True},
        ]
        
        for user_data in additional_users:
            existing = User.query.filter_by(email=user_data['email']).first()
            if not existing:
                new_user = User(
                    username=user_data['username'],
                    email=user_data['email'],
                    password_hash=generate_password_hash(user_data['password']),
                    is_admin=user_data['is_admin']
                )
                db.session.add(new_user)
                role = "Admin" if user_data['is_admin'] else "Usuario"
                print(f"✓ {role} creado: {user_data['email']}")
        
        db.session.commit()
        print("\n¡Usuarios generados exitosamente!")
        print("\n--- Resumen de Credenciales ---")
        print("ADMINISTRADORES:")
        print("  admin@techstore.com / admin123")
        print("  mod@techstore.com / mod123")
        print("\nUSUARIOS NORMALES:")
        print("  usuario@techstore.com / user123")
        print("  maria@example.com / maria123")
        print("  juan@example.com / juan123")

if __name__ == '__main__':
    seed_users()

