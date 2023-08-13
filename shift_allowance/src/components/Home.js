import React from 'react';
import GoogleSignin from './GoogleSignin';
import {useNavigate} from "react-router-dom"

export default function Home() {
  let navigate=useNavigate();
  let navigateToAddRecord=()=>{
    navigate("/addrecord");
  }

  let navigateToViewRecord=()=>{
    navigate("/viewrecord");
  }

  let navigateToProjects=()=>{
      navigate("/projects");
  }

  return (
  <div data-testid="home" className='homeOuterDiv'>
    <div className="homeAppName">
      <h3>Shift Management Application</h3>
    </div>
    <div className="homeButtondiv">
      <button onClick={()=>{navigateToAddRecord()}} className="homeButtons">
        <span>
          Add Shift Record
        </span>
      </button>
      <button onClick={()=>{navigateToViewRecord()}} className="homeButtons">
        <span>
          View Shift Records
        </span>
      </button>
      <button onClick={()=>{navigateToProjects()}} className="homeButtons">
        <span>
          Projects
        </span>
      </button>
  </div>
      <div className='homeSignoutDiv'>
      <GoogleSignin showLoginButton={false} showLogoutButton={true}></GoogleSignin>
    </div>
  </div>);
}
