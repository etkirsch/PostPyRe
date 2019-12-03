from flask import jsonify, request, abort
from webserver.auth.auth0 import requires_auth


def establish_routes_for_model(model, app, database):
    @app.route(model.__endpoint__, methods=['GET', 'POST'])
    @requires_auth
    def model_get_and_create():
        if request.method == 'GET':
            return jsonify(list(model.payloadize_all()))
        if request.method == 'POST':
            return jsonify(model.create(request, database)), 201

    @app.route(f'{model.__endpoint__}/<string:_id>', methods=['GET', 'PUT', 'DELETE'])
    @requires_auth
    def model_get_single_and_delete(_id):
        existing = model.query.filter_by(id=_id).first()
        if not existing:
            abort(404)
        if request.method == 'PUT':
            return existing.update(request, database), 200
        if request.method == 'DELETE':
            database.commit_deletion(existing), 200
            return jsonify(True), 200
        return jsonify(existing.payloadize())


def some_testable_function (some_num):
    return list(range(some_num))
