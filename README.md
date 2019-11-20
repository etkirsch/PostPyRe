# Erukar.io 2.0
This is a full stack application implementing the following technologies

* React 16.8.1
* Python 3.7.5
* Flask
* Auth0
* PostgreSQL

## Local Setup
### Python Webserver
Install Python and Heroku (on Mac use homebrew to install these).

```
brew install python
brew install heroku
```

Clone the Github repository and cd into it. Make sure that your python libs are added to your `PATH`. Install virtualenv and activate it to create a virtualized environment for Heroku. After your requirements are installed with `pip`, login to Heroku and run it locally.

```
pip install virtualenv
source venv/bin/activate
pip install -r requirements.txt
heroku login
heroku local
```

NOTE:  You will have to pass in environment variables to `heroku local` with the following variables. You should get these from auth0 (see below).

* `SHOULD_SERVE_STATIC=True` -- Enables the Static Server mode on the python webserver
* `AUTH0_DOMAIN` -- Your Auth0 domain, e.g. `mydomain.auth0.com`
* `API_AUDIENCE` -- Your API application identifier (or API Audience) in Auth0, e.g. `https://myapidomain.io`

To deactivate your virtual environment, simply execute `deactivate`.

### React UI
Install NodeJs 12.13.1 (Node and NPM installation is outside of scope for this document). Create a script for you to run the dev server locally. Copy the `example.run.sh` shell script, change it to an executable, and change the `REACT_APP_AUTH0_DOMAIN`, `REACT_APP_CLIENT_ID`, and `REACT_APP_API_AUDIENCE` values to those in your Auth0 single-page application

```
cp example.run.sh run.sh
chmod +x run.sh
```

For Hot Reload functionality, additionally copy the `./public/close-lock` directory into `./public/close-lock-local` and add your Auth0 data to the script within.
