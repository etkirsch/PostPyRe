import { config } from './auth/auth0.config'

export default class ApiService {
  constructor () {
    this.apiAudience = config.apiAudience
    this.apiUri = config.apiUri
  }

  call ({ endpoint, method='GET', body=undefined, options={} }) {
    let apiOptions = {
      ...options,
      method,
      body: JSON.stringify(body)
    }

    return fetch(`${this.apiUri}/${endpoint}`, apiOptions)
      .then((res, err) => {
        if (res && res.ok) {
          return res.json()
        }
        return err
      })
  }
}
