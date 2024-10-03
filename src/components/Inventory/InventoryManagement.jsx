import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Badge, Grid, IconButton, Alert } from '@mui/material';
import { RemoveCircle, Notifications } from '@mui/icons-material';

const InventoryManagement = () => {
  // Simulated inventory data
  const [inventory, setInventory] = useState([
    { id: 1, productName: 'Widget A', stock: 50, lowStockLevel: 10, pendingOrders: false },
    { id: 2, productName: 'Gadget B', stock: 5, lowStockLevel: 20, pendingOrders: true },
    { id: 3, productName: 'Device C', stock: 75, lowStockLevel: 30, pendingOrders: false },
  ]);

  // Handle stock removal (prevent removal if pending orders exist)
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

  return (
    <Container maxWidth="lg">
      <Box textAlign="center" mt={5}>
        <Typography variant="h4" gutterBottom>
          Inventory Management
        </Typography>
      </Box>

      {/* Display inventory overview */}
      <Grid container spacing={3}>
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
    </Container>
  );
};

export default InventoryManagement;
