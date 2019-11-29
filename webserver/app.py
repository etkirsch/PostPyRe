from flask import Flask, render_template, jsonify, request, abort
from flask_cors import CORS
from webserver.auth.auth0 import requires_auth, AuthError
from webserver.database.PostPyreDbEngine import PostPyreDbEngine
from webserver.database.models.TestModel import TestModel
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

database = PostPyreDbEngine()
database.initialize()

@app.route('/', methods=['GET'])
def app_root():
    if SHOULD_SERVE_STATIC:
        return render_template('index.html')
    return f'Version {version} of Erukar 2.0 API'

@app.route('/test-model', methods=['GET','POST'])
@requires_auth
def test_model_get_and_create():
    if request.method == 'GET':
        return jsonify(list(TestModel.payloadize_all()))
    if request.method == 'POST':
        return jsonify(TestModel.create(request, database)), 201

@app.route('/test-model/<string:_id>', methods=['GET','DELETE'])
@requires_auth
def test_model_get_single_and_delete(_id):
    existing = TestModel.query.filter_by(id=_id).first()
    if not existing:
        abort(404)
    if request.method == 'DELETE':
        database.commit_deletion(existing)
        return jsonify(True), 200
    return jsonify(existing.payloadize())

@app.route('/details')
@requires_auth
def details_route():
    return 'Secret Information'

@app.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response
