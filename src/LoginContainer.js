import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from './LoginButton'

const LoginContainer = () => {
  const { isAuthenticated, isLoading } = useAuth0()
  const url = process.env.REACT_APP_BASE_URL
  if (isLoading) {
    return <div></div>
  }
  return !isAuthenticated &&
  <div className="my-40 max-w-2xl mx-auto bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">Login to access {url}</h3>
      <LoginButton></LoginButton>
  </div>
}

export default LoginContainer
