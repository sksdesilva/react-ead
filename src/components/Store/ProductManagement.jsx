import React, { useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, TextField, Button, Grid, Typography, Box, IconButton , MenuItem } from '@mui/material';
import { Delete, Edit, AddCircle } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ProductManagement = () => {
  const location = useLocation();
  const token = location.state?.token;
  const Username = location.state?.Username;

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product

  // Store token in localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem('jwtToken', token);
    }
    fetchProducts(); // Fetch all products on component mount
  }, [token]);

  // Fetch products based on VendorName
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:5291/api/product/vendor/${Username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Function to create or update a product
  const handleSubmit = async (values, { resetForm }) => {
    const productData = {
      VendorName: Username,
      Name: values.productName,
      Price: values.productPrice,
      quntity: values.productQuntity,
      category: values.category,
    };

    try {
      if (selectedProduct) {
        // Update product if a product is selected for editing
        await axios.patch(`http://localhost:5291/api/product/update/${selectedProduct.id}`, productData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert('Product updated successfully!');
      } else {
        // Create product if no product is selected for editing
        await axios.post("http://localhost:5291/api/product/create", productData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert('Product created successfully!');
      }
      fetchProducts(); // Refresh product list
      resetForm(); // Reset form after submission
      setSelectedProduct(null); // Clear selected product
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product. Please try again.');
    }
  };

  // Function to set form values for editing
  const handleEditProduct = (product) => {
    setSelectedProduct(product);
  };

  // Function to delete a product
  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5291/api/product/delete/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Product deleted successfully!');
      fetchProducts(); // Refresh product list
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    }
  };

  // Form validation schema
  const validationSchema = Yup.object({
    productName: Yup.string().required('Product Name is required'),
    productPrice: Yup.number().required('Product Price is required').positive('Price must be positive'),
    productQuntity: Yup.number().required('Quantity is required').positive('Quantity must be positive'),
    category: Yup.string().required('Category is required'),
  });

  return (
    <Box
      sx={{
        // backgroundImage: `url("https://png.pngtree.com/png-vector/20221121/ourmid/pngtree-silver-mini-fridge-illustration-png-image_6472828.png")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Container maxWidth="md" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: 3, borderRadius: '12px' }}>
        <Box textAlign="center" mt={5}>
          <Typography variant="h4" gutterBottom>
            Product Management
          </Typography>
        </Box>

        <Formik
          initialValues={{
            productName: selectedProduct?.name || '',
            productPrice: selectedProduct?.price || '',
            productQuntity: selectedProduct?.quntity || '',
            category: selectedProduct?.category || '',
          }}
          enableReinitialize={true} // Ensures the form updates when the selectedProduct changes
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, values }) => (
            <Form>
              <Grid container spacing={3}>
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
                    id="productQuntity"
                    name="productQuntity"
                    label="Quantity"
                    type="number"
                    value={values.productQuntity}
                    onChange={handleChange}
                    helperText={<ErrorMessage name="productQuntity" />}
                    error={Boolean(values.productQuntity)}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
  <TextField
    select
    fullWidth
    id="category"
    name="category"
    label="Category"
    value={values.category}
    onChange={handleChange}
    helperText={<ErrorMessage name="category" />}
    error={Boolean(values.category)}
    variant="outlined"
  >
    <MenuItem value="Electronics">Electronics</MenuItem>
    <MenuItem value="Furniture">Furniture</MenuItem>
    <MenuItem value="HomeAppliance">Home Appliance</MenuItem>
    <MenuItem value="Other">Other</MenuItem>
  </TextField>
</Grid>

                <Grid item xs={12} textAlign="center">
                  <Button variant="contained" color="primary" type="submit" startIcon={<AddCircle />}>
                    {selectedProduct ? 'Update Product' : 'Create Product'}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>

        {/* Product List */}
        <Grid container spacing={3} mt={3}>
          {products.map((product) => (
            <Grid item xs={12} key={product.id}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p={2}
                border="1px solid #ccc"
                borderRadius="8px"
              >
                <Box display="flex" alignItems="center">
                  <img
                    src="https://png.pngtree.com/png-vector/20221121/ourmid/pngtree-silver-mini-fridge-illustration-png-image_6472828.png"
                    alt={product.name}
                    width="50"
                    height="50"
                    style={{ marginRight: '10px' }}
                  />
                  <Typography>
                    {product.name} ({product.category}) - {product.quntity} in stock
                  </Typography>
                </Box>
                <Box>
                  <IconButton color="primary" onClick={() => handleEditProduct(product)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteProduct(product.id)}>
                    <Delete />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductManagement;
