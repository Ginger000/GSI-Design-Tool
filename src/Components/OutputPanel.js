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

    //re-initiate output panel everytime GENERATE button is pressed
    //pass scenarios here is for reset output everytime click generate
    useEffect(()=>{
        setDepth(initialDepth)
        setLoadingRatio(initialRatio)
    },[initialDepth, initialRatio, scenarios])

    //get the new bound of laodingRatio
    //withdraw the warning is the current loadingRatio is within the new bound
    useEffect(()=>{
        getBound(depth, loadingRatio, "depth", "loadingRatio")  
        if(loadingRatio >= ratioBound[0]) setRatioWarning(false)
    },[depth])

    //get the bound of depth
    useEffect(()=>{
        getBound(loadingRatio, depth, "loadingRatio", "depth")
        if(depth >= depthBound[0]) setDepthWarning(false)
    }, [loadingRatio])
    
    //get the bound of controlled
    const getBound = (changed, controlled, changedStr, controlledStr) => {
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

    return (
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
    )
}

export default OutputPanel
