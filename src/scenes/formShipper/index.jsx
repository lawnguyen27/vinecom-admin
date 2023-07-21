import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useState } from "react";
import axios from "axios";
const FormShipper = () => {
  const [shipper,setShipper] = useState({})
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjE5IiwiUm9sZUlkIjoiOSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkN1c3RvbWVyIiwiU3RvcmVJZCI6Ii0xIiwibmJmIjoxNjg5NzA1NjkyLCJleHAiOjE2OTIyOTc2OTIsImlzcyI6IlZpbkVjb21BUEkiLCJhdWQiOiJWaW5FY29tQ2xpZW50In0.tBIPsntJJgfOSgsL3-DZqgG2CnmejxDOmHR7WGTjI90'
  const handleFormSubmit = (values) => {
    console.log("value",values);
    setShipper(shipper=>({...shipper,...values}));
    console.log("shipper",shipper)
    axios.post("https://vinecommerce.bsite.net/api/shippers/register", shipper,{
      header:{
         Authorization: `Bearer ${token}` ,
      }})
      .then((response) => {
      console.log(response.status, response.data.token);
  });
  }
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
                error={!!touched.imageUrl && !!errors.imageUrl}
                helperText={touched.imageUrl && errors.imageUrl}
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
                error={!!touched.category && !!errors.category}
                helperText={touched.category && errors.category}
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
                error={!!touched.commissionPercent && !!errors.commissionPercent}
                helperText={touched.commissionPercent && errors.commissionPercent}
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
                name="licemsePlate"
                error={!!touched.buildingId && !!errors.buildingId}
                helperText={touched.buildingId && errors.buildingId}
                sx={{ gridColumn: "span 4" }}
              />
        
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
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
