import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import StorefrontIcon from '@mui/icons-material/Storefront';
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PaidIcon from '@mui/icons-material/Paid';
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import axios from 'axios';
import {useEffect, useState} from "react";
const Dashboard = () => {
  const [orderCount,setOrderCount]=useState([]);
  const [orderList,setOrderList]=useState([]);
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjI5IiwiUm9sZUlkIjoiMjkiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbmlzdHJhdG9yIiwiU3RvcmVJZCI6Ii0xIiwibmJmIjoxNjg5OTU3MzA1LCJleHAiOjE2OTI1NDkzMDUsImlzcyI6IlZpbkVjb21BUEkiLCJhdWQiOiJWaW5FY29tQ2xpZW50In0.QfABYrUgc_FWJOjPDN54GsGQ6df-suHD57H4NgFvq60';

  axios.defaults.headers.common = {'Authorization': `Bearer ${token}`,"Content-Type": "application/json", 'Access-Control-Allow-Origin': '*',
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"};  
  axios.headers={'Authorization': `Bearer ${token}`,"Content-Type": "application/json", 'Access-Control-Allow-Origin': '*',
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"}
  useEffect(()=>{
    const getOrders = async ()=>{
    try{

       const res = await axios.get('https://vinecommerce.bsite.net/api/orders/page?pageIndex=0&pageSize=10')
       console.log(res.data)
       setOrderList(res.data.items)
       setOrderCount(res.data.totalItemsCount)
    
     }catch(error){
       console.log(error.message)
     }
    }
    getOrders()
  },[])
  const [storeCount,setStoreCount]=useState([]);

  useEffect(()=>{
    const getOrders = async ()=>{
    try{
       const res = await axios.get('https://vinecommerce.bsite.net/api/stores/page?pageIndex=0&pageSize=10')
       console.log(res.data)
       setStoreCount(res.data.totalItemsCount)
     }catch(error){
       console.log(error.message)
     }
    }
    getOrders()
  },[])
  const [cusCount,setCusCount]=useState([]);

  useEffect(()=>{
    const getOrders = async ()=>{
    try{
       const res = await axios.get('https://vinecommerce.bsite.net/api/customers/page?pageIndex=0&pageSize=10')
       console.log(res.data)
       setCusCount(res.data.totalItemsCount)
     }catch(error){
       console.log(error.message)
     }
    }
    getOrders()
  },[])
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={storeCount}
            subtitle="Store"
            progress="0.75"
            increase="+14%"
            icon={
              <StorefrontIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={orderCount}
            subtitle="Order Sales"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={cusCount}
            subtitle="Clients"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="3.283.000 VND"
            subtitle="Total Income"
            progress="0.80"
            increase="+43%"
            icon={
              <PaidIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                3.283.000 VND
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {orderList.map((order, i) => (
            <Box
              key={`${order.id}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {order.status.displayName}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {order.customer.name}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{order.orderDate}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
               
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $483 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
