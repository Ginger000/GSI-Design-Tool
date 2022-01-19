import React, {useState, useEffect, useRef} from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Stack } from '@mui/material';
import Alert from '@mui/material/Alert';

const OutputPanel = ({initialDepth, initialRatio, surface, scenarios}) => {
    const [depth, setDepth] = useState(initialDepth)
    const changeDepth = e => {
        let newDepth = Number.parseInt(e.target.value)
        //check whether newDepth is out of bound
        if(newDepth < depthBound) {
            setDepth(depthBound)
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
        if(newRatio < ratioBound){
            setLoadingRatio(ratioBound)
            setRatioWarning(true)
        } else {
            setLoadingRatio(newRatio)
            setRatioWarning(false)
        }
    } 
    const [depthWarning, setDepthWarning] = useState(false)
    const [ratioWarning, setRatioWarning] = useState(false)
    const [depthBound, setDepthBound] = useState(null)
    const [ratioBound, setRatioBound] = useState(null)

    //re-initiate output panel everytime GENERATE button is pressed
    useEffect(()=>{
        setDepth(initialDepth)
        setLoadingRatio(initialRatio)
    },[initialDepth, initialRatio])

    useEffect(()=>{
        getBound(depth, loadingRatio, "depth", "loadingRatio")
        getBound(loadingRatio, depth, "loadingRatio", "depth")
    },[])

    //get the new bound of laodingRatio
    //withdraw the warning is the current loadingRatio is within the new bound
    useEffect(()=>{
        getBound(depth, loadingRatio, "depth", "loadingRatio")  
        if(loadingRatio >= ratioBound) setRatioWarning(false)
    },[depth])

    //get the bound of depth
    useEffect(()=>{
        getBound(loadingRatio, depth, "loadingRatio", "depth")
        if(depth >= depthBound) setDepthWarning(false)
    }, [loadingRatio])

    //when change a parameter
    //the bound of "the changed" won't change because its scope is decided by the controlled
    //the bound of "the controlled" possibly change because its scope is decided by the changed
    //hence, we do need to check two things when change one parameter
    //Step1 - calculate the bound of "the changed", 
    //check if "the changed" is out of bound 
    //Step2 - After step1, recalculate the new bound of "the controlled",
    //check if the current value of "the controlled" is out of the new bound
    
    //get the bound of controlled
    const getBound = (changed, controlled, changedStr, controlledStr) => {
        let tempBound = []
        //we can use binary search and insert if scenarios is a large collection
        for(let s of scenarios){
            if(s[controlledStr] === controlled){
                tempBound.push(s[changedStr])
            }
        }
        tempBound.sort((a,b)=>a-b)
        console.log("tempBound",tempBound)
        if(changedStr ==="depth") {
            setDepthBound(tempBound[0])
        } 
        else if(changedStr === "loadingRatio") setRatioBound(tempBound[0])
    }

    return (
        <Stack>
            <br />
            <br />
            {console.log("depthBound", depthBound, "ratioBound", ratioBound)}
            <FormControl component="fieldset">
                <FormLabel component="legend">Depth (inches)</FormLabel>
                {depthWarning ? 
                    <Alert variant="outlined" severity="warning" > 
                        The depth cannot be smaller than {depthBound} inches in terms of your inputs and current loading ratio 
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
                            The loading ratio cannot be smaller than {ratioBound} in terms of your inputs and current GSI depth
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
                    <RadioGroup value={loadingRatio} onChange={changeRatio} row aria-label="loading ratio" name="row-radio-buttons-group">
                        <FormControlLabel disabled value={0.2} control={<Radio />} label="1:5" />
                        <FormControlLabel disabled value={0.33} control={<Radio />} label="1:3" />
                        <FormControlLabel disabled value={0.5} control={<Radio />} label="1:2" />
                        <FormControlLabel value={1} control={<Radio />} label="1:1" />
                        <FormControlLabel value={0} control={<Radio />} label="Direct Infiltration" />
                    </RadioGroup>
                </FormControl>
            }

            
        </Stack>
    )
}

export default OutputPanel
