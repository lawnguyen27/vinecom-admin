import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useState } from "react";
import axios from "axios";
const FormStore = () => {
  const [store,setStore] = useState({})
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log("value",values);
    setStore(store=>({...store,...values}));
    console.log("store",store)
    axios.post("https://vinecommerce.bsite.net/api/stores/register", store).then((response) => {
      console.log(response.status, response.data.token);
    });
  };

  return (
    <Box m="20px">
      <Header title="CREATE STORE" subtitle="Create a New Store" />

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
                label="Store Name"
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
                label="Image URL"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.imageUrl}
                name="imageUrl"
                error={!!touched.imageUrl && !!errors.imageUrl}
                helperText={touched.imageUrl && errors.imageUrl}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Category Id"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.category}
                name="category"
                error={!!touched.category && !!errors.category}
                helperText={touched.category && errors.category}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Comission Percent"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.commissionPercent}
                name="commissionPercent"
                error={!!touched.commissionPercent && !!errors.commissionPercent}
                helperText={touched.commissionPercent && errors.commissionPercent}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Building Id"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.buildingId}
                name="buildingId"
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
  imageUrl: yup.string().required("required"),
  category: yup.number().required("required"),
  commissionPercent: yup.number().required("required"),
  buildingId: yup.number().required("required"),
});
const initialValues = {
  name: "",
  imageUrl: "",
  category: 0 ,
  commissionPercent: 0,
  buildingId: 0,
};
export default FormStore;
