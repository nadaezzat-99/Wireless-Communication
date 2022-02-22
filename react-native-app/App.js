import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import {
  LineChart,
   BarChart,
   PieChart,
   ProgressChart,
   ContributionGraph,
   StackedBarChart
 } from "react-native-chart-kit";
export default function App() {
  let [temp_chart,setTemp_chart]=useState([1,2,3,4,5]);
  let [pressure_chart,setPressure_chart]=useState([5,4,3,2,1]);
  let [showPress, setShowPress] = useState(true)
  let [showTemp, setShowTemp] = useState(false)
  let[sec,setSec]= useState(0)


var label=[]
  for (let i=0;i<20;i++)
  {
    label.push(i)
  }

  //Temperature Readings
  async function getDataTemp()
  {
    // let response = await fetch("http://localhost:5000/temp")
    // //let json = await response.json()
    // setTemp_chart(response)
    // console.log(response)

  }
  setInterval(() => {
    setSec(sec+=1)
  }, 1000);
  useEffect(()=>getDataTemp(),[sec])


//Pressure Readings
  async function getDataPress()
  {
    // let response = await fetch("http://localhost:5000/pres")
    // //let json = await response.json()
    // setPressure_chart(response)
    // console.log(response)

  }
  setInterval(() => {
    setSec(sec+=1)
  }, 1000);
  useEffect(()=>getDataPress(),[sec])

  let [swap,setSwap]=useState(temp_chart) //swap between temperature and pressure data visualization.
  function Togglepress() //to show pressure data chart
  {
    setSwap(pressure_chart)
    setShowPress((prev)=>!prev)
    setShowTemp((prev)=>!prev)
  }
  function ToggleTemp()//to show temperature data chart
  {
    setSwap(temp_chart)
    setShowTemp((prev)=>!prev)
    setShowPress((prev)=>!prev)
  }
  return (
    <>
<View style={styles.container}>
  {/* <Text>Bezier Line Chart</Text> */}
  <Text> Readings visulaization</Text>
  <LineChart
    data={{
//this is x-axis data
      labels: label.map((index) => index),
      datasets: [
        {label: `${label.length} Temperature Readings`,
          //this is y-axis       
/*you need to add your data here from JSON, and remember the data you are requesting should be integer because it is line chart*/
          
          data:  swap.map((item)=>item) 
        }
      ]
    }}
    width={1220} // from react-native
    height={220}
    yAxisInterval={2} // optional, defaults to 1
    chartConfig={{
      // backgroundColor: "blue",
      backgroundGradientFrom: "blue",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
  />
</View>

{showPress&&<Button style={styles.button} title='Go to Pressure' onPress={()=>Togglepress()}/>}
{showTemp&&<Button style={styles.button} title='Go to Temperature' onPress={()=>ToggleTemp()}/>}
  <Button style={styles.button} title='Alarm'/>
  <Text style={{textAlign:"center"}}>{new Date().toLocaleTimeString()} </Text>
</>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: 'rgba(127, 255, 212, 0.062)',
    alignItems: 'center',
    justifyContent: 'center',
    marginStart:10
  },
  button:{
    flex:2,
    // flexDirection:'row',
    marginStart:30
  }
});
