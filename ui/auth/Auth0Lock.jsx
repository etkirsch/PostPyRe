import Auth0Lock from 'auth0-lock'
import { config } from './auth0.config.js'

export const Lock = new Auth0Lock(config.clientId, config.auth0Domain, {
  languageDictionary: {
    title: config.title
  },
  auth: {
    responseType: 'token id_token',
    audience: config.apiAudience,
    redirect: false,
    redirectUrl: config.redirectUri,
    params: {
      scope: 'openid profile email'
    }
  }
})
