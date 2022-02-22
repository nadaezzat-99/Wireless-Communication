import React, { useState, useEffect } from 'react'
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
    var label=[]

    for (let i=0;i<54;i++)
    {
      label.push(i)
    }
    
      setInterval(() => {
        setSec(sec+=1)
      }, 1000);

    function refreshPage() {
      window.location.reload(false);
    }

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
    /*async function get_Pressure_Data(){
      let {data} = await axios('http://localhost:5000/pres');
      console.log(data)
      setPressure_chart(data);        
    }
 
    useEffect(()=>
    {
      get_Pressure_Data()
    },[sec])*/

    var Temp_data = {
      labels: label.map((index) => index),
      datasets: [{
        label: `${label.length} Temperature Readings`,
        data: temp_chart.map((temp)=> temp),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    };
  
    /*var Pressure_data = {
      labels: label.map((index) => index),
      datasets: [{
        label: `${label.length} Temperature Readings`,
        data: pressure_chart.map((temp)=> temp),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    };*/

    var options = {
      maintainAspectRatio: false,
      legend: {
        labels: {
          fontSize: 25,
        },
      },
    }

  return (
    <>
    <div>
    <Line
      data={Temp_data}
      height={400}
      options={options}
    />
    </div>
  <h2 className='Time_Header'>It is {new Date().toLocaleTimeString()}.</h2>
  <div>
  <button className='btn btn-primary mt-5'  onClick={()=>refreshPage()}>Update Data</button>
  <label for="sensors">Choose Reading:</label>
  <select id="option">
       <option value="temp">Temprature</option>
       <option value="pressure">Pressre</option>
  </select>
  </div>
  <p>{sec}</p>
  </>
  )
}
