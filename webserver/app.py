from flask import Flask, render_template, jsonify
from flask_cors import CORS
from webserver.auth.auth0 import requires_auth, AuthError
import os

app = Flask(__name__, static_folder='../build/static', template_folder="../build")
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
version = '0.0.1'

IS_PROD_ENV = os.environ.get('IS_PROD_ENV', False)

@app.route('/', methods=['GET'])
def app_root():
    if IS_PROD_ENV:
        return 'Hello'
    return render_template('index.html')

@app.route('/options')
def options_route():
    return jsonify([0, 1, 2, 3])

@app.route('/details')
@requires_auth
def details_route():
    return 'Secret Information'

@app.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response
