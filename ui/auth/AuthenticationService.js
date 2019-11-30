import { config } from './auth0.config.js'
const FailedToAuthenticate = 'Attempted to authenticate, but the Auth0 Lock returned an invalid result'
const CalledWithoutValidState = 'Attempted to call the API in an authenticated manner without a valid authentication state'
const LocalStorageKey = 'erukar-2.0-local-auth-state'

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

  restoreExistingState () {
    let potentialState = localStorage.getItem(LocalStorageKey)
    if (potentialState) {
      this.authenticationState = JSON.parse(potentialState)
    }
  }

  hasValidState () {
    return !!this.authenticationState
  }

  setAuth (state) {
    this.authenticationState = state
  }

  onAuthenticated (Lock, result, finalizeHook) {
    Lock.hide()
    if (!result) {
      throw new Error(FailedToAuthenticate)
    }

    Lock.getUserInfo(result.accessToken, (error, profile) => {
      this.login(result, profile)
      finalizeHook(result)
    })
  }

  login (result, profile) {
    this.authenticationState = result
    this.registerAuth(profile)
  }

  registerAuth (profile) {
    localStorage.setItem(LocalStorageKey, JSON.stringify(this.authenticationState))
  }

  resetAuth () {
    this.authenticationState = null
  }

  call ({ endpoint, method='GET', body=undefined, options={} }) {
    if (!this.hasValidState()) {
      throw new Error(CalledWithoutValidState)
    }
    return this.apiService.call({
      endpoint,
      method,
      body,
      options: {
        ...options,
        headers: { Authorization: `Bearer ${this.authenticationState.accessToken}` }
      }
    })
  }
}
