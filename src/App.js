import React from 'react'
import LoginContainer from './LoginContainer'
import { Auth0Provider } from '@auth0/auth0-react'
import Authentication from './Authentication'

function App () {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID
  const audience = process.env.REACT_APP_AUDIENCE

  return (
    <div className="App">
      <Auth0Provider
          domain={domain}
          clientId={clientId}
          redirectUri={window.location.origin}
          audience={audience}
          scope="read:files"
          useRefreshTokens={true}
          cacheLocation='localstorage'
      >
        <LoginContainer></LoginContainer>
        <Authentication></Authentication>
      </Auth0Provider>
    </div>
  )
}

export default App
