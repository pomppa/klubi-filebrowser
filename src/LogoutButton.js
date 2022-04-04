import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Profile from './Profile'
const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0()

  return isAuthenticated && (
    <div className="flex justify-end m-5">
    <div>
        <Profile></Profile>
      </div>
      <div>
        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
    </div>

    </div>
  )
}

export default LogoutButton
