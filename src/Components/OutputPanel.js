import React, {useState, useEffect} from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Stack } from '@mui/material';

const OutputPanel = ({initialDepth, initialRatio}) => {
    const [depth, setDepth] = useState(initialDepth)
    const changeDepth = e => setDepth(Number.parseInt(e.target.value))
    const [loadingRatio, setLoadingRatio] = useState(initialRatio);
    const changeRatio = e => setLoadingRatio(Number.parseFloat(e.target.value))

    //re-initiate output panel everytime GENERATE button is pressed
    useEffect(()=>{
        setDepth(initialDepth)
        setLoadingRatio(initialRatio)
    },[initialDepth, initialRatio])

    return (
        <Stack>
            {console.log("initialDepth", initialDepth)}
            {console.log("initialRatio", initialRatio)}
            {console.log("depth", depth)}
            {console.log("loadingRatio", loadingRatio)}
            <br />
            <br />
            
            <FormControl component="fieldset">
                <FormLabel component="legend">Depth (inches)</FormLabel>
                <RadioGroup value={depth} onChange={changeDepth} row aria-label="depth" name="row-radio-buttons-group">
                    <FormControlLabel value={12} control={<Radio />} label="12" />
                    <FormControlLabel value={18} control={<Radio />} label="18" />
                    <FormControlLabel value={24} control={<Radio />} label="24" />
                    <FormControlLabel value={30} control={<Radio />} label="30" />
                </RadioGroup>
            </FormControl>
            

            <FormControl component="fieldset">
                <FormLabel component="legend">Loading Ratio</FormLabel>
                <RadioGroup value={loadingRatio} onChange={changeRatio} row aria-label="loading ratio" name="row-radio-buttons-group">
                    <FormControlLabel value={0.2} control={<Radio />} label="1:5" />
                    <FormControlLabel value={0.33} control={<Radio />} label="1:3" />
                    <FormControlLabel value={0.5} control={<Radio />} label="1:2" />
                    <FormControlLabel value={1} control={<Radio />} label="1:1" />
                    <FormControlLabel value={0} control={<Radio />} label="Direct Infiltration" />
                </RadioGroup>
            </FormControl>
        </Stack>
    )
}

export default OutputPanel
