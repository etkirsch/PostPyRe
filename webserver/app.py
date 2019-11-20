from flask import Flask, render_template, jsonify
from flask_cors import CORS
from webserver.auth.auth0 import requires_auth, AuthError
import os

SHOULD_SERVE_STATIC = os.environ.get('SHOULD_SERVE_STATIC', False)

def get_app_type():
    if SHOULD_SERVE_STATIC:
        return Flask(__name__, static_folder='../build/static', template_folder="../build")
    return Flask(__name__)

app = get_app_type()
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
version = '0.0.1'


@app.route('/', methods=['GET'])
def app_root():
    if SHOULD_SERVE_STATIC:
        return render_template('index.html')
    return f'Version {version} of Erukar 2.0 API'

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

