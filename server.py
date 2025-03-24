from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

masterData={
    "users": [
        {"id": 1, "name": "John Doe", "email": "john@example.com"},
        {"id": 2, "name": "Alice Smith", "email": "alice@example.com"}
    ],
    "addresses": [
        {"user_id": 1, "type": "home", "street": "123 Main St", "city": "New York"},
        {"user_id": 1, "type": "work", "street": "456 Office Rd", "city": "Los Angeles"},
        {"user_id": 2, "type": "home", "street": "789 Park Ave", "city": "Chicago"},
        {"user_id": 2, "type": "work", "street": "101 Business St", "city": "San Francisco"}
    ],
    "products": [
        {"order_id": 1001, "user_id": 1, "item": "Laptop", "price": 1200},
        {"order_id": 1002, "user_id": 2, "item": "Phone", "price": 800}
    ]

  }
# Home route
@app.route('/')
def home():
    return "Welcome to the Flask API!"

@app.route('/api/masterData', methods=['GET'])
def get_master_data():
    return jsonify(masterData)

@app.route('/api/masterData/<category>', methods=['GET'])
def get_categoryData(category):
     if category in masterData:
        return jsonify(masterData[category])
     return jsonify({"error": f"{category} not found in masterData"}), 404

@app.route('/api/masterData/users', methods=['POST'])
def add_user():
    data = request.get_json()
    
    if not data or 'name' not in data or 'email' not in data:
        return jsonify({"error": "Invalid data"}), 400
    
    new_user = {
        "id": len(masterData['users']) + 1,
        "name": data['name'],
        "email": data['email']
    }

    masterData['users'].append(new_user)
    return jsonify(new_user),201


@app.route('/api/masterData/users/<int:user_id>', methods=['DELETE'])
def remove_user(user_id):
     global masterData
     users = masterData["users"]

    # Find the user
     user = next((user for user in users if user["id"] == user_id), None)
    
     if user:
        users.remove(user)
        return jsonify({"message": "User deleted successfully"}), 200
     else:
        return jsonify({"error": "User not found"}), 404
# Get User by ID
@app.route('/api/masterData/users/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    users = masterData["users"]
    user = next((user for user in users if user["id"] == user_id), None)
    if user:
        return jsonify(user)
    return jsonify({"error": "User not found"}), 404

if __name__ == '__main__':
    # app.run(debug=True)
    # Don't use app.run() in production
    # Instead, let Gunicorn handle the deployment
    import os
    port = int(os.environ.get("PORT", 10000))  # Default to 10000 if PORT is not set
    app.run(host="0.0.0.0", port=port)
