import datetime
import jwt
from flask import Flask, jsonify, request, make_response
from functools import wraps
import os
from flask_cors import CORS, cross_origin
import httpx

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['SECRET_KEY'] = 'keepingOpenForLocalTesting'

users = {
    "rupesh@test.com": "test123",
    "test@test.com": "test123"
}

# middleware to verify the jwt token
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        
        if not auth_header:
            return jsonify({'message': 'Authorization header is missing'}), 401
        
        try:
            token = auth_header.split(' ')[1]
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = data['user']
        except:
            return jsonify({'message': 'Token is invalid'}), 401

        if current_user not in users:
            return jsonify({'message': 'User does not exist'}), 401
        
        return f(current_user, *args, **kwargs)

    return decorated


# login route that sends a JWT token upon successful authentication
@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    try:
        data = request.json
        if not data:
            return {
                "message": "Please provide user details",
                "data": None,
                "error": "Bad request"
            }, 400
        
        email = data.get('email')
        password = data.get('password')
        if email not in users or users[email] != password:
            return jsonify({'message': 'Invalid credentials', 'WWW-Authenticate': 'Basic auth="Login required"'}), 401

        token = jwt.encode({'user': email, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60)}, app.config['SECRET_KEY'])

        response = make_response(jsonify({'message': 'Login successful', 'token': token}), 200)
        return response

    except Exception as e:
        return {
                "message": "Something went wrong!",
                "error": str(e),
                "data": None
        }, 500


# route to check if the user is logged in by verifying the jwt token
@app.route('/isLoggedIn', methods=['POST'])
@token_required
def isLoggedIn(current_user):
    return jsonify({'message': 'user is logged in'}), 200


# route to get the images data
@app.route('/getData', methods=['GET'])
@token_required
def getData(current_user):
    # url = "https://www.reddit.com/r/images/new.json?limit=30"
    # headers = {}
    # response = httpx.get(url, headers=headers)

    limit = request.args.get('limit', default=30, type=int)
    after = request.args.get('after', default='', type=str)
    url = f"https://www.reddit.com/r/images/new.json?limit={limit}&after={after}"
    headers = {}
    response = httpx.get(url, headers=headers)


    if response.status_code == 200:
        data = response.json()

        filteredData = []
        for post in data['data']['children']:
            author = post['data']['author']
            title = post['data']['title']
            url = post['data']['url']
            newObject = {
                "author": author,
                "title": title,
                "url": url
            }
            filteredData.append(newObject)

        return jsonify({
            "data": filteredData,
            "after": data['data']['after']
        }), 200

    else:
        return jsonify({'error': 'Unable to retrieve data'}), 500


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port)