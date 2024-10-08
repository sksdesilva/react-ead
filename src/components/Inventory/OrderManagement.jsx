import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Button,
  Modal,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Alert,
  AppBar,
  Toolbar,
  Drawer,
  Avatar,
} from '@mui/material';
import { Menu, Cancel, CheckCircle, DoneAll } from '@mui/icons-material';

// Dummy categories for navigation
const categories = ['Customer Orders', 'Product Management', 'Vendor Management', 'Inventory'];

const orderData = [
  {
    id: 101,
    customerName: 'Malmith perera',
    status: 'Pending',
    vendors: [{ name: 'Vendor 1', status: 'Pending' }, { name: 'Vendor 2', status: 'Pending' }],
  },
  {
    id: 201,
    customerName: 'Sanath De Silva',
    status: 'Partially Delivered',
    vendors: [{ name: 'Vendor 1', status: 'Delivered' }, { name: 'Vendor 3', status: 'Pending' }],
  },
];

const OrderManagement = () => {
  const [orders, setOrders] = useState(orderData);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancelNote, setCancelNote] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleCancelOrder = (orderId) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: 'Cancelled' } : order)));
    setCancelModalOpen(false);
    setSnackbar({ open: true, message: 'Order Cancelled and Customer Notified', severity: 'info' });
  };

  const handlePartialDelivery = (orderId, vendorName) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        const updatedVendors = order.vendors.map((vendor) =>
          vendor.name === vendorName ? { ...vendor, status: 'Delivered' } : vendor
        );
        const allDelivered = updatedVendors.every((vendor) => vendor.status === 'Delivered');
        return {
          ...order,
          vendors: updatedVendors,
          status: allDelivered ? 'Delivered' : 'Partially Delivered',
        };
      }
      return order;
    });

    setOrders(updatedOrders);
    setSnackbar({ open: true, message: 'Order Status Updated', severity: 'success' });
  };

  const handleMarkAsDelivered = (orderId) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: 'Delivered' } : order)));
    setSnackbar({ open: true, message: 'Order Marked as Delivered and Customer Notified', severity: 'success' });
  };

  const openCancelModal = (order) => {
    setSelectedOrder(order);
    setCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    setCancelModalOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ open: false, message: '', severity: '' });
  };

  return (
    <Container maxWidth="lg">
      {/* AppBar for Navigation */}
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <Menu />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Order Management
          </Typography>
          <Avatar alt="User Icon" src="https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png" />
        </Toolbar>
      </AppBar>

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

      {/* Order List */}
      <Box mt={4}>
        <Typography variant="h4" textAlign="center">
          Customer Orders
        </Typography>
        <Grid container spacing={3} mt={3}>
          {orders.map((order) => (
            <Grid item xs={12} key={order.id}>
              <Box border="1px solid #ddd" borderRadius="8px" p={3} display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="h6">Order #{order.id}</Typography>
                  <Typography>Customer: {order.customerName}</Typography>
                  <Typography>Status: {order.status}</Typography>
                  <Typography>Vendors:</Typography>
                  <ul>
                    {order.vendors.map((vendor, index) => (
                      <li key={index}>
                        {vendor.name} - {vendor.status}
                        {vendor.status !== 'Delivered' && (
                          <Button size="small" onClick={() => handlePartialDelivery(order.id, vendor.name)}>
                            Mark as Ready
                          </Button>
                        )}
                      </li>
                    ))}
                  </ul>
                </Box>

                <Box display="flex" flexDirection="column">
                  {order.status !== 'Delivered' && (
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<CheckCircle />}
                      onClick={() => handleMarkAsDelivered(order.id)}
                      style={{ marginBottom: '8px' }}
                    >
                      Mark as Delivered
                    </Button>
                  )}
                  {order.status !== 'Cancelled' && (
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<Cancel />}
                      onClick={() => openCancelModal(order)}
                    >
                      Cancel Order
                    </Button>
                  )}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Cancel Modal */}
      <Modal open={cancelModalOpen} onClose={closeCancelModal}>
        <Box
          p={4}
          bgcolor="white"
          borderRadius="8px"
          boxShadow={3}
          width="400px"
          mx="auto"
          mt="100px"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography variant="h6">Cancel Order #{selectedOrder?.id}</Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Cancellation Note"
            variant="outlined"
            value={cancelNote}
            onChange={(e) => setCancelNote(e.target.value)}
            style={{ marginTop: '16px', marginBottom: '16px' }}
          />
          <Button variant="contained" color="secondary" onClick={() => handleCancelOrder(selectedOrder?.id)}>
            Cancel Order
          </Button>
        </Box>
      </Modal>

      {/* Snackbar for Notifications */}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default OrderManagement;
