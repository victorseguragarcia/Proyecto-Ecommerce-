# E-Commerce Platform

Plataforma de comercio electrónico full-stack con sistema de autenticación, gestión de productos, carrito de compras y panel de administración.

## Capturas de Pantalla

````carousel
![Página Principal - Hero Section con TechStore](<img width="1249" height="1277" alt="image" src="https://github.com/user-attachments/assets/c6fbfb38-ee67-422c-b0c4-c6da1fb8ab6c" />
)
<!-- slide -->
![Catálogo de Productos - Vista de categorías con periféricos](<img width="1249" height="1277" alt="image" src="https://github.com/user-attachments/assets/b4ec6fb8-fabe-4459-ac42-5777a9565740" />
)
<!-- slide -->
![Detalle de Producto - Información completa del producto](<img width="1249" height="1277" alt="image" src="https://github.com/user-attachments/assets/31bd2677-236e-48f9-ab2c-2f8a064141d6" />
)
<!-- slide -->
![Inicio de Sesión - Formulario de login](<img width="1249" height="1277" alt="image" src="https://github.com/user-attachments/assets/0883f0fb-67d3-4869-a1dc-34bc9f82585b" />
)
<!-- slide -->
![Registro - Formulario de registro de nuevos usuarios](<img width="1249" height="1277" alt="image" src="https://github.com/user-attachments/assets/db5af371-caf8-4c9c-86e8-418cfd7844ce" />
)
<!-- slide -->
![Panel de Administración - Gestión de productos](<img width="1249" height="1277" alt="image" src="https://github.com/user-attachments/assets/c6e925c3-5194-48b1-ba03-6491e66fc1b9" />
)
````

## Características

### Para Usuarios
- **Autenticación segura** con JWT (Login/Registro)
- **Catálogo de productos** con búsqueda y filtros
- **Carrito de compras** persistente
- **Detalles de productos** con imágenes y descripciones
- **Perfil de usuario** personalizado

### Para Administradores
- **Panel de administración** completo
- **Gestión de productos** (Crear, Editar, Eliminar)
- **Gestión de usuarios** con roles
- **Estadísticas y reportes**

## Stack Tecnológico

### Backend
- **Flask** - Framework web de Python
- **SQLAlchemy** - ORM para base de datos
- **Flask-JWT-Extended** - Autenticación con tokens JWT
- **SQLite** - Base de datos (desarrollo)
- **Flask-CORS** - Manejo de CORS

### Frontend
- **React** 19.2.0 - Biblioteca de UI
- **Vite** - Build tool y dev server
- **React Router DOM** - Enrutamiento
- **Axios** - Cliente HTTP
- **TailwindCSS** 4.1 - Framework de CSS
- **Context API** - Gestión de estado global

## Requisitos Previos

- **Python** 3.8 o superior
- **Node.js** 16 o superior
- **npm** o **yarn**
- **Git**

## Instalación

### 1. Clonar el Repositorio

```bash
git clone <URL-del-repositorio>
cd ecommerce-nuevo
```

### 2. Configurar Backend

```bash
cd backend

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# En Windows:
venv\Scripts\activate
# En Linux/Mac:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# (Opcional) Poblar base de datos con datos de prueba
python seed_products.py
python seed_users.py
```

### 3. Configurar Frontend

```bash
cd frontend

# Instalar dependencias
npm install
```

## Uso

### Ejecutar Backend

```bash
cd backend
python app.py
```

El servidor backend se ejecutará en `http://localhost:5000`

### Ejecutar Frontend

```bash
cd frontend
npm run dev
```

El servidor frontend se ejecutará en `http://localhost:5173`

### Usuarios de Prueba

Después de ejecutar los scripts de seed, tendrás estos usuarios disponibles:

**Administrador:**
- Email: `admin@example.com`
- Contraseña: `admin123`

**Usuario Regular:**
- Email: `usuario@techstore.com`
- Contraseña: `user123`

## Seeds (Datos de Prueba)

El proyecto incluye dos scripts para poblar la base de datos con datos de prueba. Es recomendable ejecutarlos después de la instalación inicial.

### seed_users.py

Crea usuarios de prueba con diferentes roles:

**Administradores:**
- `admin@techstore.com` / `admin123` (Administrador principal)
- `mod@techstore.com` / `mod123` (Moderador)

**Usuarios Normales:**
- `usuario@techstore.com` / `user123`
- `maria@example.com` / `maria123`
- `juan@example.com` / `juan123`

```bash
cd backend
python seed_users.py
```

### seed_products.py

Genera 80 productos de prueba distribuidos en 4 categorías:

- **Laptops** (20 productos): Dell, HP, Lenovo, Asus, MSI, Apple
- **Tarjetas Gráficas** (20 productos): NVIDIA, AMD, ASUS, Gigabyte
- **Procesadores** (20 productos): Intel Core i9/i7, AMD Ryzen 9/7
- **Periféricos** (20 productos): Logitech, Razer, Corsair, HyperX

Cada producto incluye:
- Nombre descriptivo con marca y modelo
- Precio aleatorio entre $50 - $3000
- Stock aleatorio entre 0 - 50 unidades
- Imagen de Unsplash
- Descripción generada automáticamente

```bash
cd backend
python seed_products.py
```

> **Nota:** Los scripts verifican si los datos ya existen para evitar duplicados. Puedes ejecutarlos múltiples veces de forma segura.

## Estructura del Proyecto

```
ecommerce-nuevo/
├── backend/
│   ├── routes/              # Rutas de la API
│   │   ├── auth.py         # Autenticación
│   │   ├── products.py     # Productos
│   │   └── admin.py        # Panel admin
│   ├── app.py              # Aplicación principal
│   ├── models.py           # Modelos de datos
│   ├── extensions.py       # Extensiones Flask
│   ├── requirements.txt    # Dependencias Python
│   ├── seed_products.py    # Datos de prueba
│   └── seed_users.py       # Usuarios de prueba
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── pages/          # Páginas principales
│   │   │   ├── admin/      # Vistas de admin
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── context/        # Context API
│   │   │   ├── CartContext.jsx
│   │   │   └── ToastContext.jsx
│   │   ├── App.jsx         # Componente raíz
│   │   └── main.jsx        # Punto de entrada
│   ├── public/             # Archivos estáticos
│   ├── package.json        # Dependencias Node
│   └── vite.config.js      # Configuración Vite
│
└── .gitignore              # Archivos ignorados por Git
```

## API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Obtener usuario actual

### Productos
- `GET /api/products` - Listar todos los productos
- `GET /api/products/:id` - Obtener producto por ID

### Admin (Requiere autenticación de admin)
- `GET /api/admin/users` - Listar usuarios
- `POST /api/admin/products` - Crear producto
- `PUT /api/admin/products/:id` - Actualizar producto
- `DELETE /api/admin/products/:id` - Eliminar producto

## Seguridad

- Contraseñas hasheadas con Werkzeug
- Autenticación basada en JWT
- Protección CORS configurada
- Validación de roles de usuario
- Tokens con expiración

## Desarrollo

### Scripts Disponibles

**Backend:**
```bash
python app.py              # Iniciar servidor de desarrollo
python seed_products.py    # Poblar productos
python seed_users.py       # Poblar usuarios
```

**Frontend:**
```bash
npm run dev               # Iniciar servidor de desarrollo
npm run build            # Construir para producción
npm run preview          # Vista previa de producción
npm run lint             # Verificar código
```

## Configuración de Variables de Entorno

### Backend (.env)
```env
SECRET_KEY=tu-clave-secreta
JWT_SECRET_KEY=tu-jwt-secreto
SQLALCHEMY_DATABASE_URI=sqlite:///ecommerce.db
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: nueva característica'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT.

## Autor

Tu Nombre - [GitHub](https://github.com/tu-usuario)

## Agradecimientos

- Flask Documentation
- React Documentation
- TailwindCSS
- Vite

---

Si este proyecto te fue útil, no olvides darle una estrella!
