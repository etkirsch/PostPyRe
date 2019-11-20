export const config = {
  title: 'Erukar 2.0',
  clientId: process.env.REACT_APP_CLIENT_ID,
  auth0Domain: process.env.REACT_APP_AUTH0_DOMAIN,
  redirectUri: `${process.env.REACT_APP_ORIGIN}/close-lock`,
  logoutUri: 'A valid logout URI from your Single Page Application',
  apiAudience: process.env.REACT_APP_API_AUDIENCE,
  apiUri: process.env.REACT_APP_API_URI
}
