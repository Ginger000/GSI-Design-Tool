import React, {useState, useEffect} from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Stack } from '@mui/material';

const OutputPanel = ({initialDepth, initialRatio}) => {
    const [depth, setDepth] = useState(null)
    const changeDepth = e => setDepth(Number.parseInt(e.target.value))
    const [loadingRatio, setLoadingRatio] = useState(null);
    const changeRatio = e => setLoadingRatio(Number.parseInt(e.target.val))
    return (
        <Stack>
            <br />
            <br />
            <FormControl component="fieldset">
                <FormLabel component="legend">Depth</FormLabel>
                <RadioGroup value={depth} onChange={changeDepth} defaultValue={12} row aria-label="depth" name="row-radio-buttons-group">
                    <FormControlLabel value={12} control={<Radio />} label="12" />
                    <FormControlLabel value={18} control={<Radio />} label="18" />
                    <FormControlLabel value={24} control={<Radio />} label="24" />
                    <FormControlLabel value={30} control={<Radio />} label="30" />
                </RadioGroup>
            </FormControl>

            <FormControl component="fieldset">
                <FormLabel component="legend">Loading Ratio</FormLabel>
                <RadioGroup value={loadingRatio} onChange={changeRatio} defaultValue="1:5" row aria-label="loading ratio" name="row-radio-buttons-group">
                    <FormControlLabel value="1:5" control={<Radio />} label="1:5" />
                    <FormControlLabel value="1:3" control={<Radio />} label="1:3" />
                    <FormControlLabel value="1:2" control={<Radio />} label="1:2" />
                    <FormControlLabel value="1:1" control={<Radio />} label="1:1" />
                    <FormControlLabel value="Direct Infiltration" control={<Radio />} label="Direct Infiltration" />
                </RadioGroup>
            </FormControl>
        </Stack>
    )
}

export default OutputPanel
