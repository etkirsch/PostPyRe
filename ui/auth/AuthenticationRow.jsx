import React, { useState } from 'react'
import LoginButton from './auth/LoginButton'
import LogoutButton from './auth/LogoutButton'

export default function Auth0Row ({ authService, setAuthenticated }) {
  let [isAuthenticated, setAuthenticated] = useState(authService.hasValidState())
}
