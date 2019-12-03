import React, { useState } from 'react'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import './auth-row.scss'

export default function Auth0Row ({ service, onAuthStateChange }) {
  let [isAuthenticated, setAuthenticated] = useState(service.hasValidState())

  function handleAuthChange (authState, authProfile) {
    onAuthStateChange(authState)
    setAuthenticated(!!authState)
  }

  function loggedInText () {
    if (service.profile && service.profile.name) {
      return `You are logged in as  ${service.profile.name}.`
    }
    return 'You are logged in.'
  }

  if (!isAuthenticated) {
    return (
      <div className='auth-row'>
        <div>You are not logged in.</div>
        <LoginButton service={service} handleAuthChange={handleAuthChange} />
      </div>
    )
  }

  return (
    <div className='auth-row'>
      <div>{loggedInText()}</div>
      <LogoutButton service={service} handleAuthChange={handleAuthChange} />
    </div>
  )
}
