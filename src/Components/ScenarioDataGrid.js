import React, {useState, useEffect} from 'react';
import { DataGrid } from "@mui/x-data-grid";
import Radio from "@mui/material/Radio";



const ScenarioDataGrid = ({scenarios}) => {
 
  
  
  const rows = scenarios
  let radioChecked = [rows[0].id]
  const columns = [
    {
      field:"radiobutton",
      headerName:'',
      width:100,
      sortable:false,
      renderCell:(params) => (
        <Radio checked={radioChecked[0] === params.id} value={params.id} />
      )
    },
    {
      field:"id",
      headerName:"ID"
    },
    {
      field:"loadingRatio",
      headerName:"Loading Ratio"
    },
    {
      field:"depth",
      headerName:"Depth"
    },
  ]
  
  

  const [selectionModel, setSelectionModel] = useState(radioChecked)
  radioChecked = selectionModel

  //To reset intial radio button check when has new scenarios
  useEffect(() => {
    setSelectionModel([scenarios[0].id])
  }, [scenarios]);

  let selectedRow;
  if(rows){
    selectedRow = rows.filter((item) => {
      return item.id === selectionModel[0];
    });
    console.log("selectedRow", selectedRow)
  }
  

  return (
    <div >
      
      <>
      <DataGrid 
        rows={rows}
        columns={columns}
        autoHeight
        selectionModel={selectionModel}
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
      />
      <div style={{ marginTop: "40px" }}>
        {selectedRow.length ? `You have selected: ${selectedRow[0].loadingRatio} ${selectedRow[0].depth}` : " "}
        
        
      </div>
      </> 
    </div>
    
  ) 
  
};

export default ScenarioDataGrid;
