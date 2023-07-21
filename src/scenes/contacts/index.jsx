// import { Box } from "@mui/material";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { tokens } from "../../theme";
// import { mockDataContacts } from "../../data/mockData";
// import Header from "../../components/Header";
// import { useTheme } from "@mui/material";

// const Contacts = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   const columns = [
//     { field: "id", headerName: "ID", flex: 0.5 },
//     { field: "registrarId", headerName: "Registrar ID" },
//     {
//       field: "name",
//       headerName: "Name",
//       flex: 1,
//       cellClassName: "name-column--cell",
//     },
//     {
//       field: "age",
//       headerName: "Age",
//       type: "number",
//       headerAlign: "left",
//       align: "left",
//     },
//     {
//       field: "phone",
//       headerName: "Phone Number",
//       flex: 1,
//     },
//     {
//       field: "email",
//       headerName: "Email",
//       flex: 1,
//     },
//     {
//       field: "address",
//       headerName: "Address",
//       flex: 1,
//     },
//     {
//       field: "city",
//       headerName: "City",
//       flex: 1,
//     },
//     {
//       field: "zipCode",
//       headerName: "Zip Code",
//       flex: 1,
//     },
//   ];

//   return (
//     <Box m="20px">
//       <Header
//         title="CONTACTS"
//         subtitle="List of Contacts for Future Reference"
//       />
//       <Box
//         m="40px 0 0 0"
//         height="75vh"
//         sx={{
//           "& .MuiDataGrid-root": {
//             border: "none",
//           },
//           "& .MuiDataGrid-cell": {
//             borderBottom: "none",
//           },
//           "& .name-column--cell": {
//             color: colors.greenAccent[300],
//           },
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: colors.blueAccent[700],
//             borderBottom: "none",
//           },
//           "& .MuiDataGrid-virtualScroller": {
//             backgroundColor: colors.primary[400],
//           },
//           "& .MuiDataGrid-footerContainer": {
//             borderTop: "none",
//             backgroundColor: colors.blueAccent[700],
//           },
//           "& .MuiCheckbox-root": {
//             color: `${colors.greenAccent[200]} !important`,
//           },
//           "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
//             color: `${colors.grey[100]} !important`,
//           },
//         }}
//       >
//         <DataGrid
//           rows={mockDataContacts}
//           columns={columns}
//           components={{ Toolbar: GridToolbar }}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default Contacts;
import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import {mockDataTeam} from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import axios from 'axios';
import {useEffect, useState} from "react";

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';


const Contacts = () => {


   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjI5IiwiUm9sZUlkIjoiMjkiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbmlzdHJhdG9yIiwiU3RvcmVJZCI6Ii0xIiwibmJmIjoxNjg5OTU3MzA1LCJleHAiOjE2OTI1NDkzMDUsImlzcyI6IlZpbkVjb21BUEkiLCJhdWQiOiJWaW5FY29tQ2xpZW50In0.QfABYrUgc_FWJOjPDN54GsGQ6df-suHD57H4NgFvq60';

axios.defaults.headers.common = {'Authorization': `Bearer ${token}`,"Content-Type": "application/json", 'Access-Control-Allow-Origin': '*',
"Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"};  
axios.headers={'Authorization': `Bearer ${token}`,"Content-Type": "application/json", 'Access-Control-Allow-Origin': '*',
"Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"}
  const [storeList, setStoreList] = useState([]);

  useEffect(() => {
    const getStore = async () => {
      try {
        console.log(axios.headers)
        const response = await axios.get('https://vinecommerce.bsite.net/api/stores/page?pageIndex=0&pageSize=10'); 
        console.log(response.data)
        setStoreList(response.data.items);
       
      } catch (error) {
        console.log(error.message);
      }
    };

    getStore();
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    { 
      field: "imageUrl", 
      headerName: "Image",
      width : 100,
      height: 100,
      renderCell:(param)=>{
        return (
          <div>
            <img  className="store-image" src={param.row.imageUrl} alt=""/>
          </div>
        )
      }
    },
    {
      field: "buiding",
      headerName: "Building Name",
      flex: 1,
      valueGetter:(storeList)=>storeList.row?.building.name
    },
    {
      field: "balance",
      headerName: "Balance",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 2,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      valueGetter:(storeList)=>storeList.row?.category.displayName
     },{
      field: "isWorking",
      headerName: "Status",
      flex: 1,
      valueGetter: (params) => {
        if (!params.value) {
          return "Bị Khóa";
        }
        // Convert the decimal value to a percentage
        return "Đang hoạt động";
      }
     },
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
      <Header title="STORE" subtitle="Managing the Stores" />
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
        <DataGrid pageSize={10} rows={storeList} columns={columns} getRowId={row=>row.id}   />
      </Box>
    </Box>
  );
};

export default Contacts;