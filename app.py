#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
from flask import Flask, render_template, send_from_directory

app = Flask(__name__,static_folder='',template_folder='')
app.debug = True

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'img'), 'teo_kao.png')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(port=port)
