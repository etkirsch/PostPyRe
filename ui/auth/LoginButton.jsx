import React from 'react'
import { Lock } from './Auth0Lock'

export default function LoginButton ({ Service }) {
  Lock.on('authenticated', (result) => Service.onAuthenticated(Lock, result))

  return (
    <div>
      <button onClick={() => Lock.show()}>
        Log In
      </button>
    </div>
  )
}
