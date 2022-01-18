import './App.css';
import React, {useState, useEffect} from 'react'
import InputPanel from './Components/InputPanel';
import OutputPanel from './Components/OutputPanel';
import Test from './Components/Test';

function App() {
  useEffect(()=>console.log(scenarios))
  const [scenarios, setScenarios] = useState(null)
  const handleSetScenarios = (result) => {
    setScenarios(result)
  }

  return (
    <>
      <InputPanel handleSetScenarios={handleSetScenarios}
        // generateScenarios={generateScenarios} 
        // durationHelperText={helperText}
      />
      
      {/* {scenarios ? <OutputPanel initialDepth = {scenarios[0]["depth"]} initialRatio = {scenarios[0]["loadingRatio"]} /> : " "} */}
      {scenarios ? <OutputPanel initialDepth = {scenarios[0].depth} initialRatio = {scenarios[0].loadingRatio} surface={scenarios[0].surface} /> : " "}

    </>
  );
}

export default App;
