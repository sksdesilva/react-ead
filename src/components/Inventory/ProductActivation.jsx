import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  IconButton,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  AppBar,
  Toolbar,
} from '@mui/material';
import { CheckCircle, Cancel, Menu } from '@mui/icons-material';

const categories = [
  'Product Management',
  'Vendor Management',
  'Inventory (current one)',
  'Product Activation',
  'Customer Requests',
];

const ProductActivation = () => {
  const [inventory, setInventory] = useState([
    { id: 1, productName: 'Radio', stock: 50, active: true, vendorName: 'Vendor A' },
    { id: 2, productName: 'Gaming Chair', stock: 5, active: false, vendorName: 'Vendor B' },
    { id: 3, productName: 'Television', stock: 75, active: true, vendorName: 'Vendor C' },
    { id: 2, productName: 'Gaming Chair', stock: 5, active: false, vendorName: 'Vendor A' },
    { id: 3, productName: 'Television', stock: 75, active: true, vendorName: 'Vendor B' },
    { id: 2, productName: 'Gaming Chair', stock: 5, active: false, vendorName: 'Vendor A' },
    { id: 3, productName: 'Television', stock: 75, active: true, vendorName: 'Vendor A' },
  ]);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleToggleActive = (id) => {
    const updatedInventory = inventory.map((product) => {
      if (product.id === id) {
        return { ...product, active: !product.active };
      }
      return product;
    });
    setInventory(updatedInventory);
  };

  return (
    <Container maxWidth="lg">
      <CssBaseline />
      <Box display="flex">
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
          <Box width={250} role="presentation">
            <List>
              {categories.map((category, index) => (
                <ListItem button key={index}>
                  <ListItemText primary={category} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        {/* Main content area */}
        <Box flexGrow={1} p={2}>
          {/* AppBar with toggle button */}
          <AppBar position="static" color="transparent">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                <Menu />
              </IconButton>
              <Typography variant="h6" style={{ flexGrow: 1 }}>
                Product Activation
              </Typography>
              <Box display="flex" alignItems="center">
                <Typography variant="h6" mr={2}>
                  Admin1
                </Typography>
                <Avatar alt="User Icon" src="https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png" />
              </Box>
            </Toolbar>
          </AppBar>

          {/* Product Activation / Deactivation */}
          <Box mt={5} textAlign="center"> {/* Centering the header */}
            <Typography variant="h5" gutterBottom>
              Product Activation / Deactivation
            </Typography>
            <Grid container spacing={3}>
              {inventory.map((product) => (
                <Grid item xs={12} key={product.id}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    p={2}
                    border="1px solid #ddd"
                    borderRadius="8px"
                    bgcolor={product.active ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)'}
                  >
                    <Typography variant="h6">
                      {product.productName} - {product.active ? 'Active' : 'Inactive'} - Vendor: {product.vendorName}
                    </Typography>
                    <Box>
                      <IconButton
                        color="primary"
                        onClick={() => handleToggleActive(product.id)}
                      >
                        {product.active ? <Cancel /> : <CheckCircle />}
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductActivation;
