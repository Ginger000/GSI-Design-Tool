import React, {useState, useEffect} from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import DATA from "../Data/newFeedbackSearch_all_setDirectInfiltrationAs2.json"
import Alert from '@mui/material/Alert';

const InputPanel = ({handleSetScenarios, duration ,setDuration, soilType, setSoilType, surfaceType, setSurfaceType, feedbackScenarios, stormRecommend}) => {
    
    //https://github.com/mui-org/material-ui/issues/8180
    const changeDuration = e => {
        setDuration(Number.parseInt(e.target.value))
        setDurationHelperText('');
        setDurationError(false);
    } 
    
    const changeSoilType = e => {
        setSoilType(e.target.value)
        setSoilHelperText('');
        setSoilError(false);
    } 
    
    const changeSurfaceType = e => {
        setSurfaceType(e.target.value)
        setSurfaceHelperText('');
        setSurfaceError(false);
    } 
    const [designStorm, setDesignStorm] = useState(null)
    const changeDesignStorm = e => setDesignStorm(e.target.value)
    const valuetext = (designStorm) => {
        return `${designStorm} inches`
    }
    
    useEffect(()=>console.log("Inputs are", duration, soilType, surfaceType, designStorm))
    const marks= [{value: 0,label: "0"},{value: 1,label: "1"},{value: 2,label: '2'},{value: 3,label: '3'},{value: 4,label: '4'},{value: 5,label: '5'}]
    
    const [durationHelperText, setDurationHelperText] = useState('');
    const [soilHelperText, setSoilHelperText] = useState('');
    const [surfaceHelperText, setSurfaceHelperText] = useState('');
    const [durationError, setDurationError] = useState(false);
    const [soilError, setSoilError] = useState(false);
    const [surfaceError, setSurfaceError] = useState(false);

    


  const generateScenarios = (event) => {
    event.preventDefault();
    if(duration && soilType && surfaceType) {
      handleSetScenarios(()=>{
          const result = DATA.filter(d=>{
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
          return result
        }
      )
    } else {
      if(!duration) {
        setDurationHelperText('Please select the duration.');
        setDurationError(true);
      }
      if(!soilType){
        setSoilHelperText('Please select the soil type .');
        setSoilError(true);
      }
      if(!surfaceType){
        setSurfaceHelperText('Please select the surface type .');
        setSurfaceError(true);
      }
    }  
  }

    return (
        <form onSubmit={generateScenarios} >
        <Stack spacing={2}>
            <Box sx={{ width: 300, ml:1 }}>
                <Typography gutterBottom>Design Storm (inches)</Typography> 
                {stormRecommend && feedbackScenarios!== null ? 
                    <Alert variant="outlined" severity="info" > 
                        You could adjust the design storm within the range {" "}
                        {feedbackScenarios[0]["designStorm"]} inches to {" "}
                        {feedbackScenarios[feedbackScenarios.length-1]["designStorm"]} inches 
                    </Alert> :
                    " "
                }
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
            
            <FormControl  component="fieldset">
                <FormLabel component="legend">Reduction Amount</FormLabel>
   
                <RadioGroup defaultValue={80} row aria-label="Reduction Amount" name="row-radio-buttons-group">
                    <FormControlLabel value={80} control={<Radio />} label="80%" />               
                </RadioGroup>
            </FormControl>
        
            <FormControl error={durationError} component="fieldset">
                <FormLabel component="legend">Duration</FormLabel>
                <FormHelperText >{durationHelperText}</FormHelperText>
                <RadioGroup defaultValue={2} value={duration} onChange={changeDuration}  row aria-label="duration" name="row-radio-buttons-group">
                    <FormControlLabel value={2} control={<Radio />} label="2 Hours" />
                    <FormControlLabel value={24} control={<Radio />} label="24 Hours" />
                </RadioGroup>
            </FormControl>
            
            <FormControl error={soilError} component="fieldset">
                <FormLabel component="legend">Soil Type</FormLabel>
                <FormHelperText>{soilHelperText}</FormHelperText>
                <RadioGroup value={soilType} onChange={changeSoilType}  row aria-label="soil type" name="row-radio-buttons-group">
                    <FormControlLabel value="fine" control={<Radio />} label="Fine" />
                    <FormControlLabel value="mixed" control={<Radio />} label="Mixed" />
                    <FormControlLabel value="coarse" control={<Radio />} label="Coarse" />
                </RadioGroup>
            </FormControl>
            
            <FormControl error={surfaceError} component="fieldset">
                <FormLabel component="legend">Surface Type</FormLabel>
                <FormHelperText>{surfaceHelperText}</FormHelperText>
                <RadioGroup value={surfaceType} onChange={changeSurfaceType}  row aria-label="surface type" name="row-radio-buttons-group">
                    <FormControlLabel value="planted" control={<Radio />} label="planted" />
                    <FormControlLabel value="paved" control={<Radio />} label="paved" />
                </RadioGroup>
            </FormControl>     
            <br />
            <Button sx={{width: 120, mt:8}} type="submit" variant="contained" >GENERATE</Button>
        </Stack>

        </form>
    )
}

export default InputPanel
