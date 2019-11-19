from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
version = '0.0.1'

@app.route('/', methods=['GET'])
def app_root():
    return version
