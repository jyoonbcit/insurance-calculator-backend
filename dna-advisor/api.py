from flask import Flask, request, jsonify

from lib.model import Model


def create_api(model: Model):
    app = Flask(__name__)

    @app.route("/api/v1/query", methods=["post"])
    def query():
        prompt = request.json["prompt"]

        if not prompt:
            return jsonify({"data": "Missing prompt!"}), 400

        response = model.query(prompt)

        return jsonify({"data": response}), 200

    @app.route("/healthz")
    def health_check():
        return jsonify({"data": "OK!"}), 200

    @app.errorhandler(404)
    def not_found(_):
        path = request.path
        return jsonify({"data": f"Route {path} not found."}), 404

    return app
