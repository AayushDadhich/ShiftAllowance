import React, {useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddRecord() {

  let [errorMessage,setErrorMessage]=useState("");
  let navigate=useNavigate();

  const addDetails = (e)=>{
    let startDate = new Date(e.target.startDate.value);
    let endDate = new Date(e.target.endDate.value);

    if(!localStorage.getItem("employeeDetails")){
      localStorage.getItem("employeeDetails",JSON.stringify([]));
    }
    //Date Validation
    if(endDate<startDate){
      setErrorMessage("End Date can't be before start date!");
      return;
    }
    else{
      setErrorMessage("");
    }

    //Existing record validation
    let existingDetail = JSON.parse(localStorage.getItem("employeeDetails"));
    let recordExist=false;
    if(existingDetail){
      existingDetail.map((record,index)=>{
        if(record.employeeID === e.target.employeeID.value){
          recordExist=true;
          return null;
        }
      return null
    });
      if(recordExist)
      {
        setErrorMessage("Record already exist for Employee Id : " + e.target.employeeID.value);
        return;
      }
      else{
        setErrorMessage("");
      }
    }
    else{
      existingDetail = [];
    }

    let details = {
      "employeeID":e.target.employeeID.value,
      "name":e.target.name.value,
      "reportingManager":e.target.reportingManager.value,
      "project":e.target.project.value,
      "location":e.target.location.value,
      "gender":e.target.gender.value,
      "startDate":e.target.startDate.value,
      "recurring":e.target.recurring.value,
      "endDate":e.target.endDate.value,
      "startTime":e.target.startTime.value,
      "endTime":e.target.endTime.value
    }
    
    existingDetail.push(details);
    
    localStorage.setItem("employeeDetails",JSON.stringify(existingDetail));
    let existingHistory = JSON.parse(localStorage.getItem("history"));
    existingHistory[details.employeeID]=[];
    console.log(existingHistory);
    localStorage.setItem("history",JSON.stringify(existingHistory));
    toast.success("Record Added Successfully");
    setTimeout(()=>{
      navigate("/home");},
    2000);
    
  }
  return(
    <div data-testid="addrecord" className="addRecordOuterDiv">
      <form onSubmit={(e)=>{
        e.preventDefault();
        addDetails(e);
      }}>
        
      <div className="addRecordField">
        <label>Employee ID :</label>
        <input required type="text" id="employeeID"  placeholder='Enter Employee ID'></input>
      </div>

      <div className="addRecordField">
        <label>Name</label>
        <input required type="text" id="name"  placeholder='Enter Employee Name'></input>
      </div>

      <div className="addRecordField">
        <label>Reporting Manager </label>
        <input required type="text" id="reportingManager"  placeholder='Enter Reporting Manager'></input>
      </div>

      <div className="addRecordField">
        <label>Project </label>
        <input required type="text" id="project"  placeholder='Enter Project Name'></input>
      </div>

      <div className="addRecordField">
        <label htmlFor="location">Location</label>
        <select required name="location" id="location"  placeholder='Choose Location'>
        <option selected disabled={true} value="">Choose Location</option>
          <option value="Jaipur">Jaipur</option>
          <option value="Banglore">Banglore</option>
          <option value="Idao">Idaho</option>
        </select>
      </div>

      <div className="addRecordField">
      <label htmlFor="gender">Gender</label>
      <input defaultChecked={true} type="radio" id="male" name="gender" value="Male"/>
        <label htmlFor="male">Male </label>
        <input type="radio" id="female" name="gender" value="Female"/>
        <label htmlFor="female">Female</label><br/>
      </div>

      <div className="addRecordField">
        <label htmlFor="startDate"  value={Date()}>Start Date</label>
        <input required name="startDate"  type="date"></input>
      </div>

      <div className="addRecordField">
      <label htmlFor="recurring">Recurring</label>
      <input defaultChecked={true} type="radio" id="yes" name="recurring" value="Yes"/>
        <label htmlFor="yes">Yes</label>
        <input type="radio" id="no" name="recurring" value="No"/>
        <label htmlFor="no">No </label><br/>
      </div>
  
      <div className="addRecordField">
        <label htmlFor="startDate">End Date</label>
        <input required name="endDate"  type="date"></input>
      </div>
    
      <div className="addRecordField">
        <label htmlFor="startTime">Start Time</label>
        <input required name="startTime"  type="time"></input>
      </div>
    
      <div className="addRecordField">
        <label htmlFor="endTime">End Time</label>
        <input required name="endTime"  type="time"></input>
      </div>
      <br></br>
      <div className="addRecordField">
      <button type="submit">Submit</button>
      <ToastContainer position="top-center" autoClose={1000}/>
      </div>
      <br></br><br></br>
      {errorMessage?<label className="errorMessage">{errorMessage}</label>:null}
    </form>
    
  </div>
  );
}
