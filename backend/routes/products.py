from flask import Blueprint, jsonify, request
from models import Product

products_bp = Blueprint('products', __name__)

@products_bp.route('/', methods=['GET'])
def get_products():
    query = Product.query
    
    # Search filter
    search_query = request.args.get('q')
    if search_query:
        search = f"%{search_query}%"
        query = query.filter(Product.name.ilike(search) | Product.description.ilike(search))
    
    # Category filter
    category = request.args.get('category')
    if category and category != 'Todas':
        query = query.filter(Product.category == category)
        
    # Price filter
    min_price = request.args.get('min_price')
    if min_price:
        query = query.filter(Product.price >= float(min_price))
        
    max_price = request.args.get('max_price')
    if max_price:
        query = query.filter(Product.price <= float(max_price))

    # Sorting
    sort_by = request.args.get('sort_by', 'created_at')
    order = request.args.get('order', 'desc')
    
    if sort_by == 'price':
        if order == 'asc':
            query = query.order_by(Product.price.asc())
        else:
            query = query.order_by(Product.price.desc())
    elif sort_by == 'name':
        if order == 'asc':
            query = query.order_by(Product.name.asc())
        else:
            query = query.order_by(Product.name.desc())
    else: # created_at or default
        if order == 'asc':
            query = query.order_by(Product.created_at.asc())
        else:
            query = query.order_by(Product.created_at.desc())

    products = query.all()
    return jsonify([product.to_dict() for product in products]), 200

@products_bp.route('/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get_or_404(id)
    return jsonify(product.to_dict()), 200
