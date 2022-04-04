import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';
import Storage from './Storage';

function Authentication() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div />;
  }

  return isAuthenticated && (
    <div>
      <LogoutButton />
      <Storage />
    </div>
  );
}

export default Authentication;
