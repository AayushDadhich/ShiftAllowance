import React from 'react';
import GoogleSignin from './GoogleSignin';

export default function Signin() {
  return(
  <div className='outerDiv'>
    <div className='innerDiv'>
            <h2>Shift Allowance Login</h2>
            <div className='signinButtonDiv'>
            <GoogleSignin showLoginButton={true} showLogoutButton={false}></GoogleSignin>
            </div>
        </div>
  </div>
      );
}
