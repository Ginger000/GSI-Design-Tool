import './App.css';
import React, {useState, useEffect} from 'react'
import InputPanel from './Components/InputPanel';
import OutputPanel from './Components/OutputPanel';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
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
      <Grid container spacing={2} >
        <Grid item xs={5} md = {5} lg={5}>
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
          />
          
          
        </Grid>
        <Grid item xs={7} md = {7} lg={7}>
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
        </Grid>
        
    </Grid>
    </>
  );
}

export default App;
