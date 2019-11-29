source venv/bin/activate &&
DATABASE_URL=postgres://localhost/mydbname AUTH0_DOMAIN=mydomain.auth0.com CLIENT_ID=my-auth0-client-id API_AUDIENCE=https://myapiaudience.io API_URI=http://127.0.0.1:5000 REDIRECT_URI=http://127.0.0.1:3000/close-lock-local heroku local ^^
deactivate
