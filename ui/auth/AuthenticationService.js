import { config } from './auth0.config.js'
const FailedToAuthenticate = 'Attempted to authenticate, but the Auth0 Lock returned an invalid result'
const CalledWithoutValidState = 'Attempted to call the API in an authenticated manner without a valid authentication state'

export default class AuthenticationService {
  constructor (apiService) {
    this.clientId = config.clientId
    this.auth0Domain = config.auth0Domain
    this.redirectUri = config.redirectUri
    this.logoutUri = config.logoutUri
    this.apiAudience = config.apiAudience

    this.authenticationState = null
    this.apiService = apiService
  }

  hasValidState () {
    return !!this.authenticationState
  }

  setAuth (state) {
    this.authenticationState = state
  }

  onAuthenticated (Lock, result) {
    Lock.hide()
    if (!result) {
      throw new Error(FailedToAuthenticate)
    }

    Lock.getUserInfo(result.accessToken, (error, profile) => {
      this.login(result, profile)
    })
  }

  login (result, profile) {
    this.authenticationState = result
    this.registerAuth(profile)
  }

  registerAuth (profile) {
  }

  callWithAuth ({ endpoint, method='GET', options={} }) {
    if (!this.hasValidState()) {
      throw new Error(CalledWithoutValidState)
    }
    return this.apiService.call({
      endpoint,
      method,
      options: {
        ...options,
        headers: { Authorization: `Bearer ${this.authenticationState.accessToken}` }
      }
    })
  }
}
