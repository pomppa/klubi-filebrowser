import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div />;
  }

  return (
    isAuthenticated && (
      <div className="flex justify-end">
        <img className="rounded-full h-10 m-1" src={user.picture} alt={user.name} />
        <h2 className="align-middle ml-5 mr-5 my-2">{user.name}</h2>
      </div>
    )
  );
}

export default Profile;
