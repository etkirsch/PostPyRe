import { config } from './auth0.config.js'
import auth0 from 'auth0-js'
const FailedToAuthenticate = 'Attempted to authenticate, but the Auth0 Lock returned an invalid result'
const CalledWithoutValidState = 'Attempted to call the API in an authenticated manner without a valid authentication state'
const LsAuthStateKey = 'erukar-2.0-local-auth-state'
const LsProfileKey = 'erukar-2.0-local-profile'

export default class AuthenticationService {
  constructor (apiService, onRegister) {
    this.clientId = config.clientId
    this.auth0Domain = config.auth0Domain
    this.redirectUri = config.redirectUri
    this.logoutUri = config.logoutUri
    this.apiAudience = config.apiAudience

    this.webAuth = new auth0.WebAuth({
      domain: this.auth0Domain,
      clientID: this.clientId,
      redirectUri: this.redirectUri,
      responseType: 'token id_token',
      scope: 'openid profile'
    })

    this.onRegister = onRegister
    this.authenticationState = null
    this.profile = null
    this.apiService = apiService
  }

  restoreExistingState () {
    let potentialState = localStorage.getItem(LsAuthStateKey)
    if (!potentialState) {
      return
    }

    try {
      this.authenticationState = JSON.parse(potentialState)
    } catch (error) {
      this.resetAuth()
      return
    }

    try {
      this.webAuth.checkSession({}, (err, res) => {
        if (err) {
          this.resetAuth()
          throw new Error()
        }
      })
    } catch (error) {
      this.resetAuth()
      return
    }

    let potentialProfile = localStorage.getItem(LsProfileKey)
    if (potentialProfile) {
      this.profile = JSON.parse(potentialProfile)
    }
  }

  hasValidState () {
    return !!this.authenticationState
  }

  setAuth (state) {
    this.authenticationState = state
  }

  onAuthenticated (Lock, result, handleAuthChange) {
    Lock.hide()
    if (!result) {
      throw new Error(FailedToAuthenticate)
    }

    Lock.getUserInfo(result.accessToken, (error, profile) => {
      this.login(result, profile)
      handleAuthChange(result, profile)
    })
  }

  login (result, profile) {
    this.authenticationState = result
    this.registerAuth(profile)
  }

  registerAuth (profile) {
    localStorage.setItem(LsAuthStateKey, JSON.stringify(this.authenticationState))
    localStorage.setItem(LsProfileKey, JSON.stringify(profile))
    this.profile = profile

    if (this.onRegister) {
      this.onRegister(profile)
    }
  }

  resetAuth () {
    this.authenticationState = null
    localStorage.removeItem(LsAuthStateKey)
    localStorage.removeItem(LsProfileKey)
  }

  call ({ endpoint, method='GET', body=undefined, options={} }) {
    if (!this.hasValidState()) {
      throw new Error(CalledWithoutValidState)
    }
    try {
      return this.apiService.call({
        endpoint,
        method,
        body,
        options: {
          ...options,
          headers: { Authorization: `Bearer ${this.authenticationState.accessToken}` }
        }
      })
    } catch (error) {
      this.resetAuth()
      throw error
    }
  }
}
