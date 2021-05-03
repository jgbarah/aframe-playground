## Setting up the environment

Some of the demos can be run just by loading the
corresponding HTML file in the browser (`File` | `Open File`).
But in general, it is better to access them through a
HTTP (web) server, and some of the demos will only work
properly if accessed that way. In fact, some of the demos will
only run if served via Secure HTTP (HTTPS).

Having a HTTP or HTTPS server serving the HTML files for you is not
difficult. You can use some site in the Net that allows
you to upload the files there, or you can set up your
own HTTP server in your computer.

### Using some site that serves the files

* [GitHub pages](https://pages.github.com/). You can upload the
files to a git repository in GitHub, and then configure
the repository to serve its contents via HTTP. Be sure of
having a file `index.html` in the root directory of the
repository. If your repository is like
`https://github.com/user/repo` it will be served via HTTPS as
`https://user.github.io/repo`. This is the way this
playground is [served to you](jgbarah.github.io/aframe-playground/).

* [GitLab pages](https://docs.gitlab.com/ee/user/project/pages/).
Similar to GitHub pages, works through the GitLab CI system.
You hace to create a `.gitlab-ci.yml` file in the root of your
repository. If your repository is like
`https://gitlab.com/user/repo` it will be served via HTTPS as
`https://user.gitlab.io/repo`. If you are not familiar with
git, you can use the web IDE (Integrated Development Environment)
that they provide to directly edit files in your browser.

* [Glitch](https://glitch.com/). After you open an account with
them, you can directly add your files there, via their
web interface. You can see the code as served by a HTTPS server
by clicking "Show".

* [JSFiddle](https://jsfiddle.net/). Quite similar to Glitch,
but you don't need to open an account. If you do, you can also
organize your projects (as you can in Glitch).

* [CodePen](https://codepen.io). Similar to Glitch and JSFiddle.

### Using your own HTTP / HTTPS server

There are many (simple) options to serve a directory in your
computer via HTTP or HTTPS:

* Python HTTPServer. If you have Python 3 installed, it is quite easy
to launch a web server. Just move (cd) to the directory that you
want to serve, and run:

```
python3 -m http.server
```

This will make the server accesible in port 8000 of the computer
where it runs. From a browser in that computer, the web server
will be accessible as http://localhost:8000. Instructions for
Python2 are a bit different.
See details in [running a simple HTTP server](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server#running_a_simple_local_http_server).

* [OpenSSL](https://www.openssl.org/). OpenSSL is available in most Linux-based distributions,
and comes with a nice HTTPS server. See instructions of how to run it in my
[notes about serving HTTPS with OpenSSL](http://jgbarah.github.io/Notes/tools-and-tricks.html#https). In short:

```
openssl req -x509 -newkey rsa:4096 -nodes -sha256 -keyout key.pem -out cert.pem -days 365
openssl s_server -key key.pem -cert cert.pem -accept 4443 -WWW
```

The server will be listening in port 4443, and therefore it will be
accesible as https://localhost:4443

* [budo](https://github.com/mattdesl/budo). Budo is a JavaScript module
providing a HTTP / HTTPS server. Once installed, it can be run as:

```
OPENSSL_CONF=/dev/null budo --port 7000 --live --open --ssl --key ./node_modules/public-encrypt/test/test_key.pem --cert ./node_modules/public-encrypt/test/test_cert.pem --cors
```

The server will be listening in port 7000, and therefore it will be
accesible as https://localhost:7000

* [webpack-dev-server](https://webpack.js.org/configuration/dev-server/).
Webpack Dev Server is a module for Webpack, providing a HTTP / HTTPS server.
If `webpack` and `webpack-dev-server` are installed, the server
can be run as (assuming the stuff to serve is under the `dist` directory):

```
webpack serve --mode development --content-base dist/
```

See how to make the server act as a HTTPS server, in the
[documentation for the devServer.https option](https://webpack.js.org/configuration/dev-server/#devserverhttps), and in the documentation included in
[this section of this tutorial](webpack/figures-03/README.md)


**Final notice:**
These servers can also be used to check the demos with VR or AR devices,
such as Oculus Quest. For that, you need to know the IP address of your computer,
and then instead of using `localhost`, use the IP address.