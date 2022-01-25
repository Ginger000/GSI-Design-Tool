import React, {useState, useEffect, useRef} from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Stack } from '@mui/material';
import Alert from '@mui/material/Alert';
import DATA from "../Data/newFeedbackSearch_all_setDirectInfiltrationAs2.json"
import Grid from '@mui/material/Grid';
import { Canvas} from "@react-three/fiber";
import {OrthographicCamera, OrbitControls} from '@react-three/drei'
import GSIbase from './WebGL/GSIbase';
import GSIbaseSurface from './WebGL/GSIbaseSurface';
import GSIplantedSurface from './WebGL/GSIplantedSurface';
import GSIdepth from './WebGL/GSIdepth';

const OutputPanel = ({initialDepth, initialRatio, surface, scenarios, handleSetFeedbackScenarios, duration,soilType, surfaceType, isStormRecommend}) => {
    const [depth, setDepth] = useState(initialDepth)
    const changeDepth = e => {
        let newDepth = Number.parseInt(e.target.value)
        //check whether newDepth is out of bound
        if(newDepth < depthBound[0]) {
            setDepth(depthBound[0])
            setDepthWarning(true)
        } else {
            setDepth(newDepth)
            setDepthWarning(false)
        } 
    } 
    const [loadingRatio, setLoadingRatio] = useState(initialRatio);
    const changeRatio = e => {
        let newRatio = Number.parseFloat(e.target.value)
        //check the whether newRatio is out of bound
        if(newRatio < ratioBound[0]){
            setLoadingRatio(ratioBound[0])
            setRatioWarning(true)
        } else {
            setLoadingRatio(newRatio)
            setRatioWarning(false)
        }
    } 
    const [depthWarning, setDepthWarning] = useState(false)
    const [ratioWarning, setRatioWarning] = useState(false)
    const [depthBound, setDepthBound] = useState([0])
    const [ratioBound, setRatioBound] = useState([0])

    const generateFeedbackScenarios = ()=>{
        if(scenarios) {
            handleSetFeedbackScenarios(()=>{
                const result = DATA.filter(d=>{
                    return d["depth"] === depth 
                    && d["loadingRatio"] === loadingRatio
                    && d["reliability"] === 1 
                    && d["soilType"] === soilType
                    && d["duration"] === duration 
                    && d["surface"] === surfaceType
                    })
                result.sort((a,b)=>a["designStorm"]-b["designStorm"])
                return result
            })  
        }
        
    }

    //re-initiate output panel everytime GENERATE button is pressed
    //pass scenarios here is for reset output everytime click generate
    useEffect(()=>{
        setDepth(initialDepth)
        setLoadingRatio(initialRatio)
    },[initialDepth, initialRatio, scenarios])

    //get the new bound of laodingRatio
    //withdraw the warning is the current loadingRatio is within the new bound
    useEffect(()=>{
        getBound(depth, "depth", "loadingRatio")  
        if(loadingRatio >= ratioBound[0]) setRatioWarning(false)
        //get design storm bound and display recommendation
        //from the ux perspective, the display INFO would suggest users to play with design storm
        generateFeedbackScenarios()
        isStormRecommend()
    },[depth])

    //get the bound of depth
    useEffect(()=>{
        getBound(loadingRatio, "loadingRatio", "depth")
        if(depth >= depthBound[0]) setDepthWarning(false)
        //get design storm bound and display recommendation
        generateFeedbackScenarios()
    }, [loadingRatio])
    
    //get the bound of controlled
    const getBound = (changed, changedStr, controlledStr) => {
        let tempBound = []
        //we can use binary search and insert if scenarios is a large collection
        for(let s of scenarios){
            if(s[changedStr] === changed){
                tempBound.push(s[controlledStr])
            }
        }
        tempBound.sort((a,b)=>a-b)
        if(changedStr ==="depth") {
            setRatioBound(tempBound)
        } 
        else if(changedStr === "loadingRatio") setDepthBound(tempBound)
    }

    const depthUnit = {
        12:1,
        18:1.5,
        24:2,
        30:2.5
    }

    return (
        <Grid container spacing={2}>
            <Grid item height={500} xs={12} md = {12} lg={12}>
                <Canvas colorManagement>
                    <OrthographicCamera makeDefault position={[10, 5, -3]} zoom={60} />
                    <ambientLight intensity={0.3} />
                    <directionalLight position={[-8, 8, -5]} castShadow intensity={1} shadow-camera-far={70} />
                    <axesHelper args={[10]} />
                    <group position={[0, 0, 3]}>
                        <GSIdepth position={[0,3,-6.01]} args={[4.001,2.501,6.005]} GSIRatio={loadingRatio} depth={depthUnit[depth]} color='yellow' />
                        <GSIplantedSurface position={[0,1.6,-6]} args={[4,0.3,6]} GSIRatio={loadingRatio} color='green' />
                        <GSIbaseSurface position={[0,1.6,0]} GSIratio={loadingRatio} args={[4.01,0.31,6.01]} color='lightgrey' />
                        <GSIbase position={[0,0,0]} args={[4,3,6]} color='pink' />
                    </group>
                    <OrbitControls makeDefault />
                </Canvas>
            </Grid>

            <Grid item xs={12} md = {12} lg={12}>
                {scenarios? 
                    <Stack>
                        <br />
                        <br />
                        {console.log("depthBound", depthBound, "ratioBound", ratioBound)}
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Depth (inches)</FormLabel>
                            {depthWarning ? 
                                <Alert variant="outlined" severity="warning" > 
                                    The depth cannot be smaller than {depthBound[0]} inches in terms of your inputs and current loading ratio 
                                </Alert> :
                                ""
                            }
                            <RadioGroup value={depth} onChange={changeDepth} row aria-label="depth" name="row-radio-buttons-group">
                                <FormControlLabel value={12} control={<Radio />} label="12" />
                                <FormControlLabel value={18} control={<Radio />} label="18" />
                                <FormControlLabel value={24} control={<Radio />} label="24" />
                                <FormControlLabel value={30} control={<Radio />} label="30" />
                            </RadioGroup>
                        </FormControl>
                        
                        {surface === "planted" ?
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Loading Ratio</FormLabel>
                                {ratioWarning ? 
                                    <Alert variant="outlined" severity="warning" > 
                                        The loading ratio cannot be smaller than {ratioBound[0]} in terms of your inputs and current GSI depth
                                    </Alert> :
                                    ""
                                }
                                <RadioGroup value={loadingRatio} onChange={changeRatio} row aria-label="loading ratio" name="row-radio-buttons-group">
                                    <FormControlLabel value={0.2} control={<Radio />} label="1:5" />
                                    <FormControlLabel value={0.33} control={<Radio />} label="1:3" />
                                    <FormControlLabel value={0.5} control={<Radio />} label="1:2" />
                                    <FormControlLabel disabled value={1} control={<Radio />} label="1:1" />
                                    <FormControlLabel disabled value={0} control={<Radio />} label="Direct Infiltration" />
                                </RadioGroup>
                            </FormControl> : 
                            <FormControl component="fieldset">
                            <FormLabel component="legend">Loading Ratio</FormLabel>
                                {ratioWarning ? 
                                    <Alert variant="outlined" severity="warning" > 
                                        The loading ratio only can be direct infiltration in terms of your inputs and current GSI depth
                                    </Alert> :
                                    ""
                                }
                                <RadioGroup value={loadingRatio} onChange={changeRatio} row aria-label="loading ratio" name="row-radio-buttons-group">
                                    <FormControlLabel disabled value={0.2} control={<Radio />} label="1:5" />
                                    <FormControlLabel disabled value={0.33} control={<Radio />} label="1:3" />
                                    <FormControlLabel disabled value={0.5} control={<Radio />} label="1:2" />
                                    <FormControlLabel value={1} control={<Radio />} label="1:1" />
                                    <FormControlLabel value={2} control={<Radio />} label="Direct Infiltration" />
                                </RadioGroup>
                            </FormControl>
                        }        
                    </Stack>
                    : ''
                }
            </Grid>
        </Grid>
    )
}

export default OutputPanel
