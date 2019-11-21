export const config = {
  title: 'Erukar 2.0',
  clientId: process.env.CLIENT_ID,
  auth0Domain: process.env.AUTH0_DOMAIN,
  redirectUri: process.env.REDIRECT_URI,
  logoutUri: 'A valid logout URI from your Single Page Application',
  apiAudience: process.env.API_AUDIENCE,
  apiUri: process.env.API_URI
}
