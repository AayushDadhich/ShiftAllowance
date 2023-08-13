import './App.css';
import {Routes, Route} from "react-router-dom"
import Signin from './components/Signin';
import Home from './components/Home'
import AddRecord from './components/AddRecord'
import ViewRecord from './components/ViewRecord'
import Projects from './components/Projects';
import UpdateRecord from './components/UpdateRecord';
import History from './components/History';
import { ToastContainer} from 'react-toastify';

export default function App() {
  if(!localStorage.getItem("history") || JSON.parse(localStorage.getItem("history"))==={}){
    let historyDetails = {};
    JSON.parse(localStorage.getItem("employeeDetails")).map((record)=>{
        historyDetails[record.employeeID]= [];
        return null;
    });
    localStorage.setItem("history",JSON.stringify(historyDetails));
}
  return(
    <div>
    <ToastContainer position="top-center" autoClose={900}/>
    <Routes>
            <Route path="/" element={<Signin/>}></Route>
            <Route path="/home" element={<Home></Home>}></Route>
            <Route path="/addrecord" element={<AddRecord></AddRecord>}></Route>
            <Route path="/viewrecord" element={<ViewRecord></ViewRecord>}></Route>
            <Route path="/updateRecords/:id" element={<UpdateRecord></UpdateRecord>}></Route>
            <Route path="/history/:id" element={<History></History>}></Route>
            <Route path="/projects" element={<Projects></Projects>}></Route>
    </Routes>
    
    </div>
  );
}
