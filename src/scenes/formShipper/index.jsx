import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useState } from "react";
import axios from "axios";

import { useEffect } from "react";
const FormShipper = () => {
  const [shipper,setShipper] = useState({})
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjI5IiwiUm9sZUlkIjoiMjkiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbmlzdHJhdG9yIiwiU3RvcmVJZCI6Ii0xIiwibmJmIjoxNjg5OTU3MzA1LCJleHAiOjE2OTI1NDkzMDUsImlzcyI6IlZpbkVjb21BUEkiLCJhdWQiOiJWaW5FY29tQ2xpZW50In0.QfABYrUgc_FWJOjPDN54GsGQ6df-suHD57H4NgFvq60'

axios.defaults.headers.common = {'Authorization': `Bearer ${token}`,"Content-Type": "application/json", 'Access-Control-Allow-Origin': '*',
"Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With","Access-Control-Allow-Credentials": true};   
  const handleFormSubmit = (values) => {
    console.log("value",values);
    setShipper(shipper=>({...shipper,...values}));
    console.log("shipper",shipper)
    axios.post("https://vinecommerce.bsite.net/api/shippers/register", {
      "name": values.name,
    "phone": values.phone,
    "password": values.password,
    "vehicleType": values.vehicleType,
    "licensePlate": values.licensePlate
    }).then((response) => {
      // Handle the response here if needed
      console.log("Response:", response.data);
    
    })
    .catch((error) => {
      // Handle the error here
      console.error("Error:", error);
     
    });
  
}
// useEffect(()=>{
//   const postForm = async ()=>{
//     try{
//       const response = await axios.post("https://vinecommerce.bsite.net/api/shippers/register", {
//         "name": shipper.name,
//         "phone": shipper.phone,
//         "password":shipper.password,
//         "vehicleType":shipper.vehicelType,
//         "licensePlate":shipper.licensePlate
//       })
//        console.log(response.data)
     
//      }catch(error){
//        console.log(error.message)
//      }
//     }
// },[]);
  return (
    
    <Box m="20px">
      <Header title="CREATE SHIPPER" subtitle="Create a New Shipper" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Shipper Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="string"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Vehicle Type"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.vehicelType}
                name="vehicelType"
                error={!!touched.vehicelType && !!errors.vehicelType}
                helperText={touched.vehicelType && errors.vehicelType}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="string"
                label="License Plate"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.licensePlate}
                name="licensePlate"
                error={!!touched.licensePlate&& !!errors.licensePlate}
                helperText={touched.licensePlate && errors.licensePlate}
                sx={{ gridColumn: "span 4" }}
              />
        
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button  type="submit" color="secondary" variant="contained">
                Create New Shipper
                
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  phone: yup.string().required("required"),
  password: yup.string().required("required"),
  vehicelType: yup.number().required("required"),
  licensePlate: yup.string().required("required"),
  
});
const initialValues = {
  name: "",
  phone: "",
  password: "" ,
  vehicelType: 0,
  licensePlate: "",
};

export default FormShipper;
