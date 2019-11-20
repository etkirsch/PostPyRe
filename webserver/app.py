from flask import Flask, render_template
from flask_cors import CORS

app = Flask(__name__, static_folder='../build/static', template_folder="../build")
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
version = '0.0.1'

@app.route('/', methods=['GET'])
def app_root():
    return render_template('index.html')
