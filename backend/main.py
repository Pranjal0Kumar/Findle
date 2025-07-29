import eventlet
eventlet.monkey_patch()

from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
from routes.upload import upload_bp
from data.config import cases_col
from core.extensions import socketio
from routes.scan import scan_bp
from routes.live import socketio_bp
from routes.mail import email_bp


def create_app():
    app = Flask(__name__)
    CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:5173"}})
    socketio.init_app(app,cors_allowed_origins="*",async_mode="eventlet")


    app.register_blueprint(upload_bp, url_prefix='/api')
    app.register_blueprint(scan_bp, url_prefix='/api')
    app.register_blueprint(socketio_bp)
    app.register_blueprint(email_bp)

    @app.route('/')
    def index():
        return {'message': 'Welcome to the Findle API'}

    return app

app = create_app()


if __name__ == '__main__':
    socketio.run(app, port=5001, debug=False)
