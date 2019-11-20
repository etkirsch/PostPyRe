import { config } from './auth/auth0.config'

export default class ApiService {
  constructor () {
    this.apiAudience = config.apiAudience
    this.apiUri = config.apiUri
  }

  call ({ endpoint, method='GET', options={} }) {
    let apiOptions = { ...options, method }

    return fetch(`${this.apiUri}/${endpoint}`, apiOptions)
      .then(res => res.json())
  }
}
