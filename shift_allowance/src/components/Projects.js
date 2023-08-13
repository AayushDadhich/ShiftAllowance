import React from 'react';

export default function Projects() {
  let records = JSON.parse(localStorage.getItem("employeeDetails"));
  let projects = new Set();
  records.map((record)=>{
      projects.add(record.project);
      return null;
  });
  projects = Array.from(projects);
  return(
    <div>
    {projects.length>0?
      <table className="project">
          <thead>
            <tr>
                <th>S.No.</th>
                <th>Projects</th>
            </tr>
          </thead>
        <tbody>
      {projects.map((project,index)=>{
          return(
            <tr>
                <td>
                    <label>{index+1}</label>
                </td>
                <td>
                    <label>{project}</label>
                </td>
            </tr>
          );
      })}
      </tbody>
      </table>
      :null
    }
    </div>
  );
}
