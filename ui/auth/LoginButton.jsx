import React from 'react'
import { Lock } from './Auth0Lock'

export default function LoginButton ({ service, handleAuthChange }) {
  Lock.on(
    'authenticated',
    (result) => service.onAuthenticated(Lock, result, handleAuthChange)
  )

  return (
    <div>
      <button onClick={() => Lock.show()}>
        Log In
      </button>
    </div>
  )
}
