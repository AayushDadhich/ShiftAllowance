import React from 'react';
export default function History() {
    let url = window.location.href.split('/');
    let employeeID = url[url.length -1];
    let historyDetails = JSON.parse(localStorage.getItem("history"));
    if(historyDetails){
        historyDetails = historyDetails[parseInt(employeeID)];
    }
    console.log(historyDetails);
    return(
        <div data-testid="history">
        {historyDetails.length>0?
          <table className="project">
              <thead>
                <tr>
                    <th>Sr.No.</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Recurring</th>
                </tr>
              </thead>
            <tbody>
          {historyDetails.map((record,index)=>{
              return(
                <tr>
                    <td>
                        <label>{index+1}</label>
                    </td>
                    <td>
                        <label>{record.startDate}</label>
                    </td>
                    <td>
                        <label>{record.endDate}</label>
                    </td>
                    <td>
                        <label> 
                            {JSON.stringify(parseInt(record.startTime.split(":")[0])%12||12) + ":" + 
                             JSON.stringify(parseInt(record.startTime.split(":")[1])) + 
                            (parseInt(record.startTime.split(":")[0])<12 ? "AM":"PM")}
                        </label>
                    </td>
                    <td>
                        <label>
                            {JSON.stringify(parseInt(record.endTime.split(":")[0])%12||12) + ":" + 
                            JSON.stringify(parseInt(record.endTime.split(":")[1])) + 
                            (parseInt(record.endTime.split(":")[0])<12 ? "AM":"PM")}
                        </label>
                    </td>
                    <td>
                        <label>{record.recurring}</label>
                    </td>
                </tr>
              );
          })}
          </tbody>
          </table>
          :<div><center>No history records exist for Employee ID : {employeeID}</center></div>
        }
        </div>
      );
}
