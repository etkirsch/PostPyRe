import React from 'react'

export default function LogoutButton ({ service, handleAuthChange }) {
  function clickLogout () {
    service.resetAuth()
    if (handleAuthChange) {
      handleAuthChange()
    }
  }

  return (
    <div>
      <button onClick={clickLogout}>
        Log Out
      </button>
    </div>
  )
}
