import React, { useState, useEffect } from 'react'
import style from './Display.module.css'


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import "chartjs-plugin-streaming"
import { Line } from 'react-chartjs-2';
import axios from 'axios';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


// Display component
export default function Display() {

    let [temp_chart,setTemp_chart]=useState([]);
    let [pressure_chart,setPressure_chart]=useState([]);
    let[sec,setSec]=useState(0)
    let [showPress, setShowPress] = useState(true)
    let [showTemp, setShowTemp] = useState(false)
    var label=[]

    for (let i=0;i<20;i++)
    {
      label.push(i)
    }
    
      setInterval(() => {
        setSec(sec+=1)
      }, 1000);

    // function refreshPage() {
    //   window.location.reload(false);
    // }
   
    // Get Tempreture sensor readings
    async function get_Temp_Data(){
      let {data} = await axios('http://localhost:5000/temp');
      console.log(data)
      setTemp_chart(data);        
    }
 
    useEffect(()=>
    {
      get_Temp_Data()
    },[sec])
    

    // Get Pressure sensor Readings
    async function get_Pressure_Data(){
      let {data} = await axios('http://localhost:5000/pres');
      console.log(data)
      setPressure_chart(data);        
    }
 
    useEffect(()=>
    {
      get_Pressure_Data()
    },[sec])

    var Temp_data = {
      labels: label.map((index) => index),
      datasets: [{
        label: `${label.length} Temperature Readings`,
        data: temp_chart.map((temp)=> temp),
        backgroundColor: [
          // 'rgba(255, 99, 132, 0.2)',
          // 'rgba(54, 162, 235, 0.2)',
          // 'rgba(255, 206, 86, 0.2)',
          // 'rgba(75, 192, 192, 0.2)',
          // 'rgba(153, 102, 255, 0.2)',
          // 'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
        //   'rgba(255, 99, 132, 1)',
        //   'rgba(54, 162, 235, 1)',
        //   'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    };
  
    var Pressure_data = {
      labels: label.map((index) => index),
      datasets: [{
        label: `${label.length} Pressure Readings`,
        data: pressure_chart.map((temp)=> temp),
        backgroundColor: [
          // 'rgba(255, 99, 132, 0.2)',
          // 'rgba(54, 162, 235, 0.2)',
          // 'rgba(255, 206, 86, 0.2)',
          // 'rgba(75, 192, 192, 0.2)',
          // 'rgba(153, 102, 255, 0.2)',
          // 'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          // 'rgba(255, 99, 132, 1)',
          // 'rgba(54, 162, 235, 1)',
          // 'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    };

    var options = {
      maintainAspectRatio: false,
      legend: {
        labels: {
          fontSize: 25,
        },
      },
    }

  let [swap,setSwap]=useState(Temp_data) //swap between temperature and pressure data visualization.
  function Togglepress() //to show pressure data chart
  {
    setSwap(Pressure_data)
    setShowPress((prev)=>!prev)
    setShowTemp((prev)=>!prev)
  }
  function ToggleTemp()//to show temperature data chart
  {
    setSwap(Temp_data)
    setShowTemp((prev)=>!prev)
    setShowPress((prev)=>!prev)
  }
  return (
    <div className='container-fluid'>
    <div className='pt-4 mt-3'>
    <Line 
      data={swap}
      height={400}
      options={options}
    />
    </div>

  <div className='text-center pt-4' >
  <div className="container">
    <div className="row">
      <div className="col-md-5">

       {showPress&&<button className='btn btn-success' onClick={()=>Togglepress()} >  Go to pressure  </button>}
       {showTemp&&<button className='btn btn-success' onClick={()=>ToggleTemp()} >  Go to temperature  </button>}
      
      </div>
  <div className="col-md-5 offset-2">
    <button className='btn btn-primary'>Alarm</button>
  </div></div>
  </div>
  <h2 className='Time_Header border border-2 py-2 mt-2' > <i className="fa-solid fa-clock"></i> {new Date().toLocaleTimeString()}.</h2>
  {/* <button className='btn btn-primary mt-5'  onClick={()=>refreshPage()}>Update Data</button> */}

  </div>
 
  <p>{sec}</p>
  </div>
  )
}
