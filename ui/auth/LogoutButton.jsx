import React from 'react'

export default function LogoutButton ({ service, finalizeHook }) {
  function clickLogout () {
    service.resetAuth()
    if (finalizeHook) {
      finalizeHook()
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
