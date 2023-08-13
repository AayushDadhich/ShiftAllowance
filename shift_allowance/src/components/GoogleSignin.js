import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import {useNavigate} from "react-router-dom"
import {toast } from 'react-toastify';

export default function GoogleSignin(props) {
    const clientId = "272414057225-cd33ibtr47skh25vl2ihrr6tp5kp16o9.apps.googleusercontent.com";
    let navigate = useNavigate();
    const onLoginSuccess = (res)=>{
        localStorage.setItem("userinfo",JSON.stringify(res));
        toast.success("Logged In Successfully");
        setTimeout(()=>{navigate("/home");},
        900);
    };

    const onLoginFailure = ()=>{
        toast.warning("Login Failed");
    };

    const onSignoutSuccess=()=>{
        localStorage.setItem("userinfo",JSON.stringify(null));
        toast.success("Logged Out Successfully");
        setTimeout(()=>{navigate("/")},
        900);
    }

  return (
    <div data-testid="googlesignin">
    { props.showLoginButton ?
        <GoogleLogin
            clientId={clientId}
            buttonText="Sign In"
            onSuccess={onLoginSuccess}
            onFailure={onLoginFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        /> : null}

    { props.showLogoutButton ?
        <GoogleLogout
            clientId={clientId}
            buttonText="Sign Out"
            onLogoutSuccess={onSignoutSuccess}
        >
        </GoogleLogout> : null
    }
    </div>
  );
}

