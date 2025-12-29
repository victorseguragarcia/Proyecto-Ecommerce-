from flask import Blueprint, request, jsonify
from extensions import db
from models import Product, User
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from functools import wraps

admin_bp = Blueprint('admin', __name__)

def admin_required():
    def wrapper(fn):
        @wraps(fn)
        @jwt_required()
        def decorator(*args, **kwargs):
            # Get user ID from identity
            user_id = get_jwt_identity()
            # Get additional claims
            claims = get_jwt()
            
            # Check if user is admin from claims
            is_admin = claims.get('is_admin', False)
            
            if not is_admin:
                return jsonify({'message': '¡Solo administradores!'}), 403
            return fn(*args, **kwargs)
        return decorator
    return wrapper

# Product Management
@admin_bp.route('/products', methods=['POST'])
@admin_required()
def add_product():
    data = request.get_json()
    new_product = Product(
        name=data['name'],
        description=data.get('description', ''),
        price=data['price'],
        stock=data.get('stock', 0),
        image_url=data.get('image_url', ''),
        category=data.get('category', '')
    )
    db.session.add(new_product)
    db.session.commit()
    return jsonify(new_product.to_dict()), 201

@admin_bp.route('/products/<int:id>', methods=['PUT'])
@admin_required()
def update_product(id):
    product = Product.query.get_or_404(id)
    data = request.get_json()
    
    product.name = data.get('name', product.name)
    product.description = data.get('description', product.description)
    product.price = data.get('price', product.price)
    product.stock = data.get('stock', product.stock)
    product.image_url = data.get('image_url', product.image_url)
    product.category = data.get('category', product.category)
    
    db.session.commit()
    return jsonify(product.to_dict()), 200

@admin_bp.route('/products/<int:id>', methods=['DELETE'])
@admin_required()
def delete_product(id):
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Producto eliminado'}), 200

# User Management
@admin_bp.route('/users', methods=['GET'])
@admin_required()
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users]), 200

@admin_bp.route('/users/<int:id>', methods=['PUT'])
@admin_required()
def update_user_role(id):
    user = User.query.get_or_404(id)
    data = request.get_json()
    
    if 'is_admin' in data:
        user.is_admin = data['is_admin']
        
    db.session.commit()
    return jsonify(user.to_dict()), 200

@admin_bp.route('/users/<int:id>', methods=['DELETE'])
@admin_required()
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'Usuario eliminado'}), 200
