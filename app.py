from flask import Flask, render_template, jsonify

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/get_flag', methods=['GET'])
def get_flag():
    # This is your flag
    flag = "SecurinetsEPS{Qu33n_4nd_Jc4ks}"
    return jsonify({"flag": flag})

if __name__ == '__main__':
    app.run(debug=True)
