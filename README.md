# PostPyRe
PostPyRe is a stack which implements the following technologies

* React 16.8.1
* Python 3.7.5
* Flask
* Auth0
* PostgreSQL

In practice, we recommend using CI on github using the workflows provided in `.github/workflows`. Additionally, PostPyRe offers out-of-the-box Heroku support for hosting, though the option of where to host the static site is left at the discretion of the implementer.

## How do I use this?
Currently, PostPyRe can serve as a baseline for your application if you fork the code branch on github. There are plans to implement a CLI for spinning up a starting point of PostPyRe without needing to fork from Github.

### What is planned?
Revision of the Example Table would be nice. I would like to make it more performant and less chaotic, but it is just an example and shouldn't really be used beyond referencing.

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
Install NodeJs 12.13.1 (Node and NPM installation is outside of scope for this document). Create a script for you to run the dev server locally. Copy the `example.run.sh` shell script, change it to an executable, and change the `AUTH0_DOMAIN`, `CLIENT_ID`, and `API_AUDIENCE` values to those in your Auth0 single-page application

```
cp example.run.sh run.sh
chmod +x run.sh
```

For Hot Reload functionality, additionally copy the `./public/close-lock` directory into `./public/close-lock-local` and add your Auth0 data to the script within.

### Postgres
The following instructions are for macOS Mojave. Windows and Linux instructions will be added in the future.

Install [Postgres App v2.3.2](https://postgresapp.com/downloads.html). Run through its install and get a basic server set up and running locally. Installation/Setup of PostgreSQL is outside of the scope of this document. Update your `serve.sh` file to point to the correct database via `DATABASE_URL=postgres://localhost/<your-db-name>`.
