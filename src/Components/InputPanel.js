import React, {useState, useEffect} from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import DATA from "../Data/newFeedbackSearch_all.json"

const InputPanel = ({generateScenarios}) => {
    const [duration, setDuration] = useState(null)
    //https://github.com/mui-org/material-ui/issues/8180
    const changeDuration = e => setDuration(Number.parseInt(e.target.value))
    const [soilType, setSoilType] = useState(null)
    const changeSoilType = e => setSoilType(e.target.value)
    const [surfaceType, setSurfaceType] = useState(null)
    const changeSurfaceType = e => setSurfaceType(e.target.value)
    const [designStorm, setDesignStorm] = useState(null)
    const changeDesignStorm = e => setDesignStorm(e.target.value)
    const valuetext = (designStorm) => {
        return `${designStorm} inches`
    }
    useEffect(()=>console.log(duration, soilType, surfaceType, designStorm))
    const marks= [{value: 0,label: "0"},{value: 1,label: "1"},{value: 2,label: '2'},{value: 3,label: '3'},{value: 4,label: '4'},{value: 5,label: '5'}]
    
    
    return (
        
        <Stack spacing={2}>
            <Box sx={{ width: 300, ml:1 }}>
                <Typography gutterBottom>Design Storm (inches)</Typography>
                <Slider
                    aria-label="Design Storm"
                    defaultValue={0.1}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    step={0.1}
                    marks = {marks}
                    min={0.1}
                    max={5}
                    onChange={changeDesignStorm}
                    value = {designStorm}
                />
            </Box>
            
            <FormControl component="fieldset">
                <FormLabel component="legend">Reduction Amount</FormLabel>
                <RadioGroup row aria-label="Reduction Amount" name="row-radio-buttons-group">
                    <FormControlLabel value={80} control={<Radio />} label="80%" />               
                </RadioGroup>
            </FormControl>
        
            <FormControl component="fieldset">
                <FormLabel component="legend">Duration</FormLabel>
                <RadioGroup value={duration} onChange={changeDuration}  row aria-label="duration" name="row-radio-buttons-group">
                    <FormControlLabel value={2} control={<Radio />} label="2 Hours" />
                    <FormControlLabel value={24} control={<Radio />} label="24 Hours" />
                </RadioGroup>
            </FormControl>
            
            <FormControl component="fieldset">
                <FormLabel component="legend">Soil Type</FormLabel>
                <RadioGroup value={soilType} onChange={changeSoilType}  row aria-label="soil type" name="row-radio-buttons-group">
                    <FormControlLabel value="fine" control={<Radio />} label="Fine" />
                    <FormControlLabel value="mixed" control={<Radio />} label="Mixed" />
                    <FormControlLabel value="coarse" control={<Radio />} label="Coarse" />
                </RadioGroup>
            </FormControl>
            
            <FormControl component="fieldset">
                <FormLabel component="legend">Surface Type</FormLabel>
                <RadioGroup value={surfaceType} onChange={changeSurfaceType}  row aria-label="surface type" name="row-radio-buttons-group">
                    <FormControlLabel value="planted" control={<Radio />} label="planted" />
                    <FormControlLabel value="paved" control={<Radio />} label="paved" />
                </RadioGroup>
            </FormControl>     
            <br />
            <Button sx={{width: 120, mt:8}} variant="contained" onClick={()=>generateScenarios(DATA, duration, soilType, surfaceType, designStorm)} >GENERATE</Button>
        </Stack>
    )
}

export default InputPanel
