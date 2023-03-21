#! /usr/bin/env python3

import os
import re

#filename = '/tmp/test.html'

substs_html = [
    # aframe
    {'regex': re.compile(r"//aframe.io/releases/\d+.\d+.\d+/aframe.min.js"),
     'new': "//aframe.io/releases/1.4.0/aframe.min.js"},
    # aframe-extras
    {'regex': re.compile(r"//cdn.jsdelivr.net/gh/donmccurdy/aframe-extras@v\d+.\d+.\d+/dist/aframe-extras.min.js"),
     'new': "//cdn.jsdelivr.net/gh/donmccurdy/aframe-extras@v6.1.1/dist/aframe-extras.min.js"},
    {'regex': re.compile(r"//cdn.rawgit.com/donmccurdy/aframe-extras/v\d+.\d+.\d+/dist/aframe-extras.min.js"),
     'new': "//cdn.jsdelivr.net/gh/donmccurdy/aframe-extras@v6.1.1/dist/aframe-extras.min.js"},
    # aframe-pysics-system
    {'regex': re.compile(r"//cdn.rawgit.com/donmccurdy/aframe-physics-system/v\d+.\d+.\d+/dist/aframe-physics-system.min.js"),
     'new': "//cdn.jsdelivr.net/gh/n5ro/aframe-physics-system@v4.0.1/dist/aframe-physics-system.min.js"},
    {'regex': re.compile(r"//cdn.jsdelivr.net/gh/n5ro/aframe-physics-system@v\d+.\d+.\d+/dist/aframe-physics-system.min.js"),
     'new': "//cdn.jsdelivr.net/gh/n5ro/aframe-physics-system@v4.0.1/dist/aframe-physics-system.min.js"},
    # A-Frame docs
    {'regex': re.compile(r"//aframe.io/docs/\d+.\d+.\d+/"),
     'new': "//aframe.io/docs/1.4.0/"}
    ]

substs_md = substs_html

def update_file(substs, filename):
    with open(filename, 'r') as f:
        text = f.read()

    for subst in substs:
        regex = subst['regex']
        text = regex.sub(subst['new'], text)

    with open(filename, 'w') as f:
        f.write(text)

for root, dirs, files in os.walk(".", followlinks=False):
    for file in files:
        file_path = os.path.join(root, file)
        if 'node_modules/' not in file_path:
            if file.endswith(".html"):
                print(f"Updating {file_path}")
                update_file(substs_html, file_path)
            if file.endswith(".md"):
                print(f"Updating {file_path}")
                update_file(substs_md, file_path)
