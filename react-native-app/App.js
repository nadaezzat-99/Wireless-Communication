import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  LineChart,
   BarChart,
   PieChart,
   ProgressChart,
   ContributionGraph,
   StackedBarChart
 } from "react-native-chart-kit";
export default function App() {
  let [data , setData]=useState([1,2,3,4,5,6])
  let[sec,setSec]= useState(0)
  async function getData()
  {
    let response = await fetch("http://localhost:5000/temp")
    //let json = await response.json()
    setData(response)
    console.log(response)

  }
  setInterval(() => {
    setSec(sec+=1)
  }, 1000);
  useEffect(()=>getData(),[sec])
  return (
<View>
  {/* <Text>Bezier Line Chart</Text> */}
  <LineChart
    data={{
//this is x-axis data
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          //this is y-axis       
/*you need to add your data here from JSON, and remember the data you are requesting should be integer because it is line chart*/
          
          data:  data.map((item)=>item) 
        }
      ]
    }}
    width={1220} // from react-native
    height={220}
    // yAxisLabel="students"
    // yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      // backgroundColor: "#e26a00",
      // backgroundGradientFrom: "#fb8c00",
      // backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    // bezier
    // style={{
    //   marginVertical: 8,
    //   borderRadius: 16
    // }}
  />
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
