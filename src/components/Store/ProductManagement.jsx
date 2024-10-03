import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, TextField, Button, Grid, Typography, Box, IconButton } from '@mui/material';
import { Delete, Edit, AddCircle } from '@mui/icons-material';


const ProductManagement = () => {
  // Sample function for handling form submission (create/update)
  const handleSubmit = (values) => {
    console.log('Submitted Data:', values);
  };

  // Validation schema for the form
  const validationSchema = Yup.object({
    productId: Yup.string().required('Product ID is required'),
    productName: Yup.string().required('Product Name is required'),
    productPrice: Yup.number().required('Product Price is required').positive('Price must be positive'),
  });

  return (
    <Box
      sx={{
        backgroundImage: `url("https://png.pngtree.com/png-vector/20221121/ourmid/pngtree-silver-mini-fridge-illustration-png-image_6472kkk828.png")`, // Use a suitable background image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        fontFamily: "'Poppins', sans-serif"  // Applying Poppins font
      }}
    >
      <Container maxWidth="md" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: 3, borderRadius: '12px' }}>
        <Box textAlign="center" mt={5}>
          <Typography variant="h4" gutterBottom>
            Product Management
          </Typography>
        </Box>
        
        <Formik
          initialValues={{ productId: '', productName: '', productPrice: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, values }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="productId"
                    name="productId"
                    label="Product ID"
                    value={values.productId}
                    onChange={handleChange}
                    helperText={<ErrorMessage name="productId" />}
                    error={Boolean(values.productId)}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="productName"
                    name="productName"
                    label="Product Name"
                    value={values.productName}
                    onChange={handleChange}
                    helperText={<ErrorMessage name="productName" />}
                    error={Boolean(values.productName)}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="productPrice"
                    name="productPrice"
                    label="Product Price"
                    type="number"
                    value={values.productPrice}
                    onChange={handleChange}
                    helperText={<ErrorMessage name="productPrice" />}
                    error={Boolean(values.productPrice)}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="productPrice"
                    name="productPrice"
                    label="Quntity"
                    type="number"
                    value={values.productQuntity}
                    onChange={handleChange}
                    helperText={<ErrorMessage name="productPrice" />}
                    error={Boolean(values.productPrice)}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} textAlign="center">
                  <Button variant="contained" color="primary" type="submit" startIcon={<AddCircle />}>
                    Create/Update Product
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>

        <Box textAlign="center" mt={5}>
          <Typography variant="h5">Manage Existing Products</Typography>
        </Box>

        {/* Sample Product List */}
        <Grid container spacing={3} mt={3}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" justifyContent="space-between" p={2} border="1px solid #ccc" borderRadius="8px">
              <Box display="flex" alignItems="center">
                <img src="https://png.pngtree.com/png-vector/20221121/ourmid/pngtree-silver-mini-fridge-illustration-png-image_6472828.png" alt="Product 1" width="50" height="50" style={{ marginRight: '10px' }} />
                <Typography>Product 1: Awesome Widget</Typography>
              </Box>
              <Box>
                <IconButton color="primary">
                  <Edit />
                </IconButton>
                <IconButton color="error">
                  <Delete />
                </IconButton>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" alignItems="center" justifyContent="space-between" p={2} border="1px solid #ccc" borderRadius="8px">
              <Box display="flex" alignItems="center">
                <img src="https://png.pngtree.com/png-vector/20221121/ourmid/pngtree-silver-mini-fridge-illustration-png-image_6472828.png" alt="Product 2" width="50" height="50" style={{ marginRight: '10px' }} />
                <Typography>Product 2: Super Gadget</Typography>
              </Box>
              <Box>
                <IconButton color="primary">
                  <Edit />
                </IconButton>
                <IconButton color="error">
                  <Delete />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductManagement;
