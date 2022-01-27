import './App.css';
import React, {useState, useEffect} from 'react'
import InputPanel from './Components/InputPanel';
import OutputPanel from './Components/OutputPanel';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { DataGrid } from "@mui/x-data-grid";
import Radio from "@mui/material/Radio";
import Grid from '@mui/material/Grid';
import Test from './Components/Test';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const drawerWidth = 500

function App(props) {

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const {window} = props
  const [mobileOpen, setMobileOpen] = useState(false)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

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

  const drawer = (
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
  )

  const container = window !== undefined ? () =>window().document.body : undefined


  return (
    <Box sx={{display:'flex'}} >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            GSI Design Tool
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }}}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <OutputPanel 
          initialDepth = {scenarios? scenarios[0].depth : ''} 
          initialRatio = {scenarios? scenarios[0].loadingRatio : ''} 
          surface={scenarios? scenarios[0].surface : ''} 
          scenarios={scenarios? scenarios:''} 
          handleSetFeedbackScenarios={scenarios? handleSetFeedbackScenarios : ''} 
          duration={duration}
          soilType={soilType}
          surfaceType={surfaceType}
          isStormRecommend={handleIsStormRecommend}
          feedbackScenarios={feedbackScenarios}
          stormRecommend={stormRecommend}
        />
        <br />
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Instruction" {...a11yProps(0)} />
              <Tab label="Theory" {...a11yProps(1)} />
              <Tab label="Console" {...a11yProps(2)} />
              <Tab label="Credit" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            1, Select your site condition on the left input panel
            <br />
            2, Click <Button variant="contained" size="small">GENERATE</Button>  button in the left input panel to get the recommended GSI prototype on the right output panel. 
            (This protype is the one with lowest cost and fits your site conditions )
            <br />
            3, GSI-loading-ratio options and GSI-depth options would pop up as the same time your GSI prototype is generated. 
            You're encouraged to adjust the ratio and depth. This tool would <Alert sx={{display:"inline-flex", pt:0, pb:0}}  variant="outlined" severity="warning"> give you warnings </Alert> if the ratio or depth not fits your site conditions.
            <br />
            4, Everytime you adjust the ratio or depth, the maximum design storm you could reach to would also be changed. This tool would <Alert sx={{display:"inline-flex", pt:0, pb:0}} variant="outlined" severity="info"> give you the recommended range of possible design storm</Alert>.

          </TabPanel>
          <TabPanel value={value} index={1}>
            1, What is reliability curve?
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac.
            <br />
            2, How this GSI Design Tool works?
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          </TabPanel>
          <TabPanel value={value} index={2}>
            @ WATER LAB 2022
          </TabPanel>
          <TabPanel value={value} index={3}>
            @ WATER LAB 2022
          </TabPanel>
        </Box>
        
      </Box>
    </Box>
  );
}

export default App;
