import React, {useState } from 'react';
import {useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';

export default function UpdateRecord() {
    let navigate = useNavigate();
    let url = window.location.href.split('/');
    let employeeID = url[url.length -1];
    let allRecords = JSON.parse(localStorage.getItem("employeeDetails"));
    let existingRecordIndex = -1;
    let recordToUpdate;
    if(allRecords)
    { allRecords.map((record,index)=>{
              if(record.employeeID===employeeID){
                  recordToUpdate = record;
                  existingRecordIndex = index;
                  return null;
              }
              return null;
      })
    };
    let [errorMessage,setErrorMessage]=useState("");
    
    let updateRecord=(e)=>{
        if(!localStorage.getItem("history") || JSON.parse(localStorage.getItem("history"))==={}){
            let historyDetails = {};
            allRecords.map((record)=>{
                historyDetails[record.employeeID]= [];
                return null;
            });
            localStorage.setItem("history",JSON.stringify(historyDetails));
        }

        let startDate = e.target.startDate.value;
        let endDate = document.getElementById("endDate").textContent.split("-").reverse().join("-");
        
        //Date Validation
        if(endDate<startDate){
            setErrorMessage("End Date can't be before start date!");
            return;
        }
        else{
            setErrorMessage("");
        }

        //Overlapping Validation
        let existingEndDate = new Date(recordToUpdate.endDate);
        let updateStartDate = new Date(e.target.startDate.value);
        let todayDate = new Date();
        todayDate = todayDate.toISOString();
        todayDate = todayDate.split("T")[0];
        let updateStartTime = new Date(todayDate + e.target.startTime.value).getTime();
        let updateEndTime   = new Date(todayDate + e.target.endTime.value).getTime();
        let validStartTime  = new Date(todayDate + "22:00").getTime();
        let validEndTime    = new Date(todayDate +"07:00").getTime();
        if(existingEndDate>updateStartDate){
            setErrorMessage("Existing shift will end on "+ 
            existingEndDate.getDate()+  "-" + (existingEndDate.getMonth()+1)+ "-" + existingEndDate.getFullYear());
            return;
        }
        else if(updateStartTime>validStartTime || updateEndTime>validEndTime){
            setErrorMessage("Night Shift is only valid from 10:00 PM to 07:00 AM ");
            return;
        }
        
        //setting history
        let historyDetails = JSON.parse(localStorage.getItem("history"));
        historyDetails[employeeID].push(allRecords[existingRecordIndex]);
        localStorage.setItem("history",JSON.stringify(historyDetails));

        //updating
        allRecords[existingRecordIndex].startDate = startDate;
        allRecords[existingRecordIndex].endDate = endDate;
        allRecords[existingRecordIndex].startTime = e.target.startTime.value;
        allRecords[existingRecordIndex].endTime = e.target.endTime.value;
        
        //saving updates
        localStorage.setItem("employeeDetails",JSON.stringify(allRecords));
        toast.success("Record Updated Successfully");
        setTimeout(()=>{navigate("/home");},
        2000);

    }
  return(
    <div data-testid="updaterecord" >
    {recordToUpdate ?
      <div data-testid="updaterecord">
      <div className="addRecordOuterDiv">
      <form onSubmit={(e)=>{
        e.preventDefault();
        updateRecord(e);
      }}>
      <div className="addRecordField">
        <label>Employee ID :</label>
        <label>{recordToUpdate.employeeID}</label>
      </div>

      <div className="addRecordField">
        <label>Name</label>
        <label>{recordToUpdate.name}</label>
      </div>

      <div className="addRecordField">
        <label>Reporting Manager : </label>
        <label>{recordToUpdate.reportingManager}</label>
      </div>

      <div className="addRecordField">
        <label>Project </label>
        <label>{recordToUpdate.project}</label>
      </div>

      <div className="addRecordField">
        <label htmlFor="location">Location</label>
        <label>{recordToUpdate.location}</label>
      </div>

      <div className="addRecordField">
      <label htmlFor="gender">Gender</label>
      <label>{recordToUpdate.gender}</label>
      </div>

      <div className="addRecordField">
        <label htmlFor="startDate"  value={Date()}>Start Date</label>
        <input required name="startDate" type="date" onChange={
            (e)=>{
                let endDate = new Date(new Date(e.target.value).getTime() + 1000*60*60*24*30);
                document.getElementById("endDate").textContent = (endDate.toISOString().split('T')[0]).split("-").reverse().join("-");
            }
        }></input>
      </div>

      <div className="addRecordField">
      <label htmlFor="recurring">Recurring</label>
      <input defaultChecked={true} type="radio" id="yes" name="recurring" value="Yes"/>
        <label htmlFor="yes">Yes</label>
        <input type="radio" id="no" name="recurring" value="No"/>
        <label htmlFor="no">No </label><br/>
      </div>
  
      <div className="addRecordField">
        <label  htmlFor="startDate">End Date</label>
        <label id="endDate">-</label>
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
      <button type="submit">Update</button>
      </div>
      <ToastContainer position="top-center" autoClose={1000}/>
      <br></br><br></br>
      {errorMessage?<label className="errorMessage">{errorMessage}</label>:null}
    </form>
    
  </div>
  </div>
  : <div>Something Went Wrong!!</div>}
  </div>);
}
