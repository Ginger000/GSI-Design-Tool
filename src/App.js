import './App.css';
import React, {useState, useEffect} from 'react'
import InputPanel from './Components/InputPanel';
import OutputPanel from './Components/OutputPanel';
import Test from './Components/Test';

function App() {
  useEffect(()=>console.log(scenarios))
  const [scenarios, setScenarios] = useState(null)
  const generateScenarios = (data, duration, soilType, surfaceType, designStorm) => {   
      setScenarios(()=>{
        const result = data.filter(d=>{
          return d["designStorm"] === designStorm 
          && d["duration"] === duration
          && d["soilType"] === soilType
          && d["surface"] === surfaceType
          && d["reliability"] === 1
        })
        result.sort((a,b)=>{
          if(a.loadingRatio === b.loadingRatio){
            return a.depth - b.depth
          }
          return a.loadingRatio-b.loadingRatio
        });
        console.log("result[0]",result[0])
        console.log("result",result)
        return result
      }
    )      
  }

  return (
    <>
      <InputPanel generateScenarios={generateScenarios}/>
      
      {/* {scenarios ? <OutputPanel initialDepth = {scenarios[0]["depth"]} initialRatio = {scenarios[0]["loadingRatio"]} /> : " "} */}
      {scenarios ? <OutputPanel initialDepth = {scenarios[0].depth} initialRatio = {scenarios[0].loadingRatio} /> : " "}

    </>
  );
}

export default App;
