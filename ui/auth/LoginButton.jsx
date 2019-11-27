import React from 'react'
import { Lock } from './Auth0Lock'

export default function LoginButton ({ service, finalizeHook }) {
  Lock.on(
    'authenticated',
    (result) => service.onAuthenticated(Lock, result, finalizeHook)
  )

  return (
    <div>
      <button onClick={() => Lock.show()}>
        Log In
      </button>
    </div>
  )
}
