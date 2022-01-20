import './App.css';
import React, {useState, useEffect} from 'react'
import InputPanel from './Components/InputPanel';
import OutputPanel from './Components/OutputPanel';
import Test from './Components/Test';

function App() {
  useEffect(()=>console.log("scenarios", scenarios, "feedbackScenarios", feedbackScenarios))
  //get Scenarios from inputPanel and use it in outputPanel
  const [scenarios, setScenarios] = useState(null)
  //get feedbackScenarios from output and use it in inputPanel
  const [feedbackScenarios, setFeedbackScenarios] = useState(null)
  const [duration, setDuration] = useState(null)
  const [soilType, setSoilType] = useState(null)
  const [surfaceType, setSurfaceType] = useState(null)
  const [stormRecommend, isStormRecommend] = useState(false);
  const handleIsStormRecommend = ()=>{
    isStormRecommend(true)
  }
  const handleSetSurfaceType = (input) => {
    setSurfaceType(input)
  }
  const handleSetSoilType = (input)=>{
    setSoilType(input)
  }
  const handleSetDuration = (input)=>{
    setDuration(input)
  }
  const handleSetScenarios = (result) => {
    setScenarios(result)
  }
  const handleSetFeedbackScenarios = (result) =>{
    setFeedbackScenarios(result)
  }

  return (
    <>
      <InputPanel 
        handleSetScenarios={handleSetScenarios}
        duration={duration}
        setDuration={handleSetDuration}
        soilType={soilType}
        setSoilType={handleSetSoilType}
        surfaceType={surfaceType}
        setSurfaceType={handleSetSurfaceType}
        feedbackScenarios={feedbackScenarios}
        stormRecommend={stormRecommend}
        // generateScenarios={generateScenarios} 
        // durationHelperText={helperText}
      />
      
      {/* {scenarios ? <OutputPanel initialDepth = {scenarios[0]["depth"]} initialRatio = {scenarios[0]["loadingRatio"]} /> : " "} */}
      {scenarios ? 
      <OutputPanel 
        initialDepth = {scenarios[0].depth} 
        initialRatio = {scenarios[0].loadingRatio} 
        surface={scenarios[0].surface} 
        scenarios={scenarios} 
        handleSetFeedbackScenarios={handleSetFeedbackScenarios} 
        duration={duration}
        soilType={soilType}
        surfaceType={surfaceType}
        isStormRecommend={handleIsStormRecommend}
      /> 
      : " "}

    </>
  );
}

export default App;
