import './App.css';
import React, {useState, useEffect} from 'react'
import InputPanel from './Components/InputPanel';
import OutputPanel from './Components/OutputPanel';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Test from './Components/Test';
import { Canvas} from "@react-three/fiber";
import {OrthographicCamera, OrbitControls} from '@react-three/drei'
import GSIbase from './Components/GSIbase';
import GSIbaseSurface from './Components/GSIbaseSurface';

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
  const [initialDepth, setInitialDepth] = useState(null)
  const [initialRatio, setInitialRatio] = useState(null)
  const [depth, setDepth] = useState(initialDepth)
  const [loadingRatio, setLoadingRatio] = useState(initialRatio);
  useEffect(()=>{
    if(scenarios) {
      setInitialDepth(scenarios[0].depth)
      setInitialRatio(scenarios[0].loadingRatio)
    }
    console.log("initialDepth",initialDepth, initialRatio)
  }, [scenarios])

  const handleSetDepth = (input) => {
    setDepth(input)
  }
  const handleSetLoadingRatio = (input) => {
    setLoadingRatio(input)
  }

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
          
          {initialDepth && initialRatio ? 
          <OutputPanel 
            initialDepth = {initialDepth} 
            initialRatio = {initialRatio} 
            surface={scenarios[0].surface} 
            scenarios={scenarios} 
            handleSetFeedbackScenarios={handleSetFeedbackScenarios} 
            duration={duration}
            soilType={soilType}
            surfaceType={surfaceType}
            isStormRecommend={handleIsStormRecommend}
            depth={depth}
            setDepth={handleSetDepth}
            loadingRatio={loadingRatio}
            setLoadingRatio={handleSetLoadingRatio}
          /> 
          : " "}
        </Grid>
        <Grid item xs={7} md = {7} lg={7}>
            <Canvas colorManagement>
              <OrthographicCamera makeDefault position={[10, 5, -3]} zoom={60} />
              <ambientLight intensity={0.3} />
              <directionalLight position={[-8, 8, -5]} castShadow intensity={1} shadow-camera-far={70} />
              <axesHelper args={[10]} />
              <group position={[0, 0, 3]}>
                {/* <GSIbaseSurface position={[0,1.6,0]} args={[4.01,0.31,6.01]} color='lightgrey' /> */}
                {/* <GSIbase position={[0,0,0]} args={[4,3,6]} color='pink' /> */}
              </group>
              <OrbitControls makeDefault />
            </Canvas>
        </Grid>
        
    </Grid>
    </>
  );
}

export default App;
