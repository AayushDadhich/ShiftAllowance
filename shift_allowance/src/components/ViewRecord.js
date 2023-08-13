import {React,useState} from 'react';
import {useNavigate} from "react-router-dom"


//for search bars
let empIDFilter = false;
let nameFilter = false;
export default function ViewRecord() {



//for filter buttons
let monthFilter = false;
let femaleFilter = false;
let allRecordsFilter = false;
let allMonthFilter = false;

    let navigate=useNavigate();
    if(!localStorage.getItem("employeeDetails")){
        localStorage.getItem("employeeDetails",JSON.stringify([]));
    }
    let [records,setRecords] = useState(JSON.parse(localStorage.getItem("employeeDetails")));

    let navigateToAddRecord=()=>{
      navigate("/addrecord");
    }

    let navigateToViewHistory=(e)=>{
        let index = e.target.className;
        navigate("/history/"+ records[index].employeeID);
    }

    let navigateToUpdateRecords=(e)=>{
        let index = e.target.className;
        navigate("/updateRecords/"+ records[index].employeeID);
    }

    let filterRecords=(e)=>{
        let currentRecords = JSON.parse(localStorage.getItem("employeeDetails"));
        if(allRecordsFilter){
            document.getElementById("allRecordsFilterButton").style.background="green";
            monthFilter=false;
            femaleFilter=false;
            allMonthFilter=false;
        }
        else{
            document.getElementById("allRecordsFilterButton").style.background="";
        }
        if(monthFilter){
            document.getElementById("monthFilterButton").style.background="green";
            let date = new Date();
            let month = date.getMonth();
            let filteredRecords = currentRecords.filter((record)=>{
                new Date(record.startDate);
                if(new Date(record.startDate).getMonth()===month || new Date(record.endDate).getMonth()===month ){
                        return record;
                }
                return null;

            }
            );
            currentRecords = filteredRecords;
            allMonthFilter=false;
        }
        else{
            document.getElementById("monthFilterButton").style.background="";
        }
        if(femaleFilter){
            document.getElementById("femlaeFilterbutton").style.background="green";
            let filteredRecords = currentRecords.filter((record)=>{
                if(record.gender==="Female"){
                        return record;
                }
                return  null;
            });
             currentRecords = filteredRecords;
        }
        else{
            document.getElementById("femlaeFilterbutton").style.background=""; 
        }

        if(allMonthFilter){
            document.getElementById("allMonthFilter").style.background="green";
            let filteredRecords = currentRecords.filter((record)=>{
                if(new Date(record.startDate).getMonth()+1===parseInt(e.target.value)){
                        return record;
                }
                return  null;
            });
             currentRecords = filteredRecords;
        }
        else{
            document.getElementById("allMonthFilter").style.background=""; 
        }
        return currentRecords;
}

    let searchRecords=(e)=>{
        let filteredRecords = JSON.parse(localStorage.getItem("employeeDetails"));
        if(e.target.value===""){
            filteredRecords = JSON.parse(localStorage.getItem("employeeDetails"));
            if(e.target.name==="empid"){
                empIDFilter = false;
            }
            if(e.target.name==="name"){
                nameFilter = false;
            }
        }

        if(empIDFilter){
            filteredRecords = filteredRecords.filter((record)=>{
                console.log((record.employeeID.toLowerCase()).startsWith(document.getElementsByName("empid")[0].value.toLowerCase()));
                if((record.employeeID.toLowerCase()).startsWith(document.getElementsByName("empid")[0].value.toLowerCase())){
                    return record;
                }
            });
        }

        //console.log(empIDFilter,nameFilter);
        //console.log(filteredRecords);

        if(nameFilter){
            console.log(document.getElementsByName("name")[0].value);
            filteredRecords = filteredRecords.filter((record)=>{
                if((record.name.toLowerCase()).startsWith(document.getElementsByName("name")[0].value.toLowerCase()))
                    return record;
            });
        }
        
        return filteredRecords;
    }

    
  return (
    <div className="viewRecord">
        <center>
    <h2>Shift Records</h2>

    {/* Search Bar */}
    <div style={{marginTop:"3%"}}>
        <input
            type="text"
            id="empid"
            placeholder="Search by Employee ID"
            name="empid" 
            onChange={(e)=>{
                empIDFilter  = true;
                console.log(empIDFilter,nameFilter);
                setRecords(searchRecords(e));
                }
            }
        />
        <input
            type="text"
            id="name"
            placeholder="Search by Name"
            name="name" 
            onChange={(e)=>{
                nameFilter = true;
                console.log(empIDFilter,nameFilter);
                setRecords(searchRecords(e));
                }
            }
        />
        {/* <div>
            <label >Search By : </label>
            <select style={{marginLeft:"1%", marginTop:"2%"}} name="searchBy" id="searchBy">
            <option value="employeeID">Employee ID</option>
            <option value="name">Name</option>
            <option value="location">Location</option>
            <option value="reportingManager">Reporting Manager</option>
            <option value="project">Project</option>
            </select>
      </div> */}
      </div>

      {/* Filters */}
      <div>
        <button id="allRecordsFilterButton" style={{background:"green"}} onClick={()=>{
            if(allRecordsFilter){
                allRecordsFilter=false;
            }
            else{
                allRecordsFilter=true;
            }
            setRecords(filterRecords(allRecordsFilter));
            }}>All Records</button>
        <button background="green" id="monthFilterButton" onClick={()=>{
            allRecordsFilter=false;
            if(monthFilter){
                monthFilter = false;
            }
            else{
                monthFilter = true;
            }
            setRecords(filterRecords("monthFilter"));
        }}>Current Month</button>

        <button background="green" id="femlaeFilterbutton" onClick={()=>{
            allRecordsFilter=false;
            if(femaleFilter){
                femaleFilter = false ;
            }
            else{
                femaleFilter = true;
            }
            setRecords(filterRecords("femaleFilter"));
        }}>Female Employee</button>

        <select style={{marginLeft:"1%", marginTop:"2%"}} name="searchBy" id="allMonthFilter" onChange={(e)=>{
            allRecordsFilter=false;
            if(allMonthFilter){
                femaleFilter = false ;
            }
            else{
                allMonthFilter = true;
            }
            setRecords(filterRecords(e));
        }}>
            <option disabled selected={true} value="">Choose Month</option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
            </select>
      </div>

    {/* Records */}
    {records && records.length>0 ?
      <table className="recordTable">
          <thead>
          <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Project Manager</th>
              <th>Project</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Recurring</th>
              <th>Location</th>
              <th>Update</th>
          </tr>
          </thead>
          <tbody>
      {records.map((record,index)=>{
        return(
            <tr>
                <td>
                    {record.employeeID}
                </td>
                <td>
                    {record.name}
                </td>
                <td>
                    {record.reportingManager}
                </td>
                <td>
                    {record.project}
                </td>
                <td>
                    {record.startDate}
                </td>
                <td>
                    {record.endDate}
                </td>
                <td>
                    {console.log(record)}
                    {JSON.stringify(parseInt(record.startTime.split(":")[0])%12||12) + ":" + 
                     JSON.stringify(parseInt(record.startTime.split(":")[1])) + 
                     (parseInt(record.startTime.split(":")[0])<12 ? "AM":"PM")
                     }
                </td>
                <td>
                {JSON.stringify(parseInt(record.endTime.split(":")[0])%12||12) + ":" + 
                     JSON.stringify(parseInt(record.endTime.split(":")[1])) + 
                     (parseInt(record.endTime.split(":")[0])<12 ? "AM":"PM")
                     }
                </td>
                <td>
                    {record.recurring}
                </td>
                <td>
                    {record.location}
                </td>
                <td>
                    <button className={index} onClick={(e)=>{
                        navigateToUpdateRecords(e);
                    }}>Update</button>
                </td>
                <td>
                    <button className={index} onClick={(e)=>{
                        navigateToViewHistory(e);
                    }}>History</button>
                </td>
            </tr>);
      })}
      </tbody>
      </table>
      :
      <div>
        <label>No Shift Records Exixts.</label>
        <br></br>
        <button onClick={()=>{navigateToAddRecord()}}>
        <span>
            Add Shift Record
        </span>
        </button>
    </div>}
      </center>
      </div>
  );
}
