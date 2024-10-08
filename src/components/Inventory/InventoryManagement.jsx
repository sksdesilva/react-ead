import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Badge,
  Grid,
  IconButton,
  Alert,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  AppBar,
  Toolbar,
} from '@mui/material';
import { RemoveCircle, Notifications, Menu } from '@mui/icons-material';

const categories = [
  'Product Management',
  'Vendor Management',
  'Inventory (current one)',
  'Product Activation',
  'Customer Requests',
];

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([
    { id: 1, productName: 'Radio', stock: 50, lowStockLevel: 10, pendingOrders: false },
    { id: 2, productName: 'Gaming Chair', stock: 5, lowStockLevel: 20, pendingOrders: true },
    { id: 3, productName: 'Television', stock: 75, lowStockLevel: 30, pendingOrders: false },
  ]);

  // State for drawer open/close
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Handle stock removal
  const handleRemoveStock = (id) => {
    const updatedInventory = inventory.map((product) => {
      if (product.id === id) {
        if (!product.pendingOrders && product.stock > 0) {
          return { ...product, stock: product.stock - 1 };
        } else {
          alert('Cannot remove stock from products with pending orders or no stock left.');
        }
      }
      return product;
    });
    setInventory(updatedInventory);
  };

  // Toggle drawer
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
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
                Inventory Management
              </Typography>
              <Box display="flex" alignItems="center">
                <Typography variant="h6" mr={2}>
                  Admin1
                </Typography>
                <Avatar alt="User Icon" src="https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png" />
              </Box>
            </Toolbar>
          </AppBar>

          {/* Display inventory overview */}
          <Grid container spacing={3} mt={2}>
            <Grid item xs={12} md={6}>
              <Box textAlign="center" p={2} border="1px solid #ddd" borderRadius="12px" bgcolor="white">
                <Typography variant="h5">Total Products: {inventory.length}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box textAlign="center" p={2} border="1px solid #ddd" borderRadius="12px" bgcolor="white">
                <Typography variant="h5">
                  Low Stock Alerts:
                  <Badge badgeContent={inventory.filter(p => p.stock < p.lowStockLevel).length} color="error">
                    <Notifications />
                  </Badge>
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Product List */}
          <Box mt={5}>
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
                    bgcolor={product.stock < product.lowStockLevel ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 255, 0, 0.1)'}
                  >
                    <Box>
                      <Typography variant="h6">
                        {product.productName} - Stock: {product.stock}
                        {product.pendingOrders && <span> (Pending Orders)</span>}
                      </Typography>

                      {/* Low stock alert inside product card */}
                      {product.stock < product.lowStockLevel && (
                        <Alert severity="warning" sx={{ mt: 1 }}>
                          Low stock! Only {product.stock} items left.
                        </Alert>
                      )}
                    </Box>

                    <Box>
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveStock(product.id)}
                        disabled={product.pendingOrders || product.stock === 0}
                      >
                        <RemoveCircle />
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

export default InventoryManagement;
