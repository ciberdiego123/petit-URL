from flask import Flask, redirect, jsonify
from flask import request
from database.db import initialize_db
from database.models import Website
from string import ascii_letters, digits
from random import choice
from utils.validators import is_a_valid_url

app = Flask(__name__)

app.config['MONGODB_SETTINGS'] = {
    'host': 'mongodb+srv://user-petit-url:password_petit_url_5@cluster0.bv2le.mongodb.net/petit_url?retryWrites=true&w=1'
}

initialize_db(app)


@app.route('/')
def is_alive():
    return 'OK'

@app.route('/author')
def author():
    return '<h2>By Diego ROMERO</h2>'

@app.route('/<code>')
def redirect_with_code(code):
    if not Website.objects(code=code):
        return 'No URL saved with the given code'
    else:
        website = Website.objects.get(code=code)
        return redirect(website.url)


def generate_code(url, length):
    if 'http://' not in url and 'https://' not in url:
        url = ''.join(['http://', url])

    if not Website.objects(url=url):
        characters = ascii_letters + digits
        code = ''.join(choice(characters) for i in range(length))
        # Save Website in mongo
        new_website = Website(url=url, code=code)
        new_website.save()
    # Get code of the Website
    website = Website.objects.get(url=url)
    return website.code


@app.route('/generatePetitURL', methods=['POST'])
def generate_petit_url():
    url = request.json['url']
    if is_a_valid_url(url):
        return jsonify(
            code=generate_code(url, 7)
        )
    else:
        return jsonify(
            error="Invalid URL"
        )

