import { Box, Typography, useTheme ,Button} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import {mockDataTeam} from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import axios from 'axios';
import {useEffect, useState} from "react";



const Team = () => {

  const [cusList,setCusList]=useState([]);

  useEffect(()=>{
    const getCustomers = async ()=>{
    try{
       const res = await axios.get('https://vinecommerce.bsite.net/api/customers/page?pageIndex=0&pageSize=10')
       console.log(res.data)
       setCusList(res.data.items)
     }catch(error){
       console.log(error.message)
     }
    }
    getCustomers()
  },[])

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    
    {
      field: "buildingId",
      headerName: "Building ID",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
 
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 2,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
     },{
      field: "isBlocked",
      headerName: "Status",
      flex: 1,
      cellClassName: "name-column--cell",
      valueGetter: (params) => {
        if (params.value) {
          return "Bị Khóa";
        }
        // Convert the decimal value to a percentage
        return "Đang hoạt động";
      }
    },,
    {
     field:"Action",
     renderCell:(cellValues)=>{
       return(
         <Button 
         variant="contained"
         color="primary"
         >
             Block
         </Button>
       )
     }
    }
    // {
    //   field: "accessLevel",
    //   headerName: "Access Level",
    //   flex: 1,
    //   renderCell: ({ row: { access } }) => {
    //     return (
    //       <Box
    //         width="60%"
    //         m="0 auto"
    //         p="5px"
    //         display="flex"
    //         justifyContent="center"
    //         backgroundColor={
    //           access === "admin"
    //             ? colors.greenAccent[600]
    //             : access === "manager"
    //             ? colors.greenAccent[700]
    //             : colors.greenAccent[700]
    //         }
    //         borderRadius="4px"
    //       >
    //         {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
    //         {access === "manager" && <SecurityOutlinedIcon />}
    //         {access === "user" && <LockOpenOutlinedIcon />}
    //         <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
    //           {access}
    //         </Typography>
    //       </Box>
    //     );
    //   },
    // },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={cusList} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
