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
  TextField,
  Button,
} from '@mui/material';
import { Menu, Edit, Delete } from '@mui/icons-material';

const categories = [
  'Product Management',
  'Vendor Management',
  'Inventory (current one)',
  'Product Activation',
  'Customer Requests',
];

const VendorCreation = () => {
  const [vendors, setVendors] = useState([
    { id: 1, name: 'Vendor 1', email: 'vendor1@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Vendor 2', email: 'vendor2@example.com', phone: '098-765-4321' },
  ]);

  const [newVendor, setNewVendor] = useState({ name: '', email: '', phone: '' });
  const [editingVendor, setEditingVendor] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVendor({ ...newVendor, [name]: value });
  };

  const handleAddVendor = () => {
    if (newVendor.name && newVendor.email && newVendor.phone) {
      const newVendorWithId = {
        id: vendors.length + 1, // Make sure this generates a unique ID
        ...newVendor,
      };
      setVendors([...vendors, newVendorWithId]);
      setNewVendor({ name: '', email: '', phone: '' }); // Clear inputs
    } else {
      alert('Please fill all fields');
    }
  };

  const handleEditVendor = (vendor) => {
    setNewVendor(vendor);
    setEditingVendor(vendor.id); // Set the vendor being edited
  };

  const handleUpdateVendor = () => {
    setVendors((prev) =>
      prev.map((vendor) => (vendor.id === editingVendor ? { ...newVendor, id: editingVendor } : vendor))
    );
    setNewVendor({ name: '', email: '', phone: '' }); // Clear inputs
    setEditingVendor(null); // Reset editing state
  };

  const handleDeleteVendor = (id) => {
    setVendors(vendors.filter((vendor) => vendor.id !== id));
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
                Vendor Management
              </Typography>
              <Box display="flex" alignItems="center">
                <Typography variant="h6" mr={2}>
                  Admin1
                </Typography>
                <Avatar
                  alt="User Icon"
                  src="https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"
                />
              </Box>
            </Toolbar>
          </AppBar>

          {/* Vendor Creation Form */}
          <Box mt={5}>
            <Typography variant="h5" gutterBottom textAlign="center">
              {editingVendor ? 'Edit Vendor' : 'Create New Vendor'}
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Vendor Name"
                  name="name"
                  value={newVendor.name}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={newVendor.email}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={newVendor.phone}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Box mt={2} textAlign="center">
              <Button
                variant="contained"
                color="primary"
                onClick={editingVendor ? handleUpdateVendor : handleAddVendor}
              >
                {editingVendor ? 'Update Vendor' : 'Add Vendor'}
              </Button>
            </Box>

            {/* List of Vendors */}
            <Box mt={5}>
              <Typography variant="h5" gutterBottom textAlign="center">
                Vendor List
              </Typography>
              <Grid container spacing={3}>
                {vendors.map((vendor) => (
                  <Grid item xs={12} key={vendor.id}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      p={2}
                      border="1px solid #ddd"
                      borderRadius="8px"
                      bgcolor="rgba(240, 240, 240, 0.5)"
                    >
                      <Typography variant="h6">
                        {vendor.name} - {vendor.email} - {vendor.phone}
                      </Typography>
                      <Box>
                        <IconButton color="primary" onClick={() => handleEditVendor(vendor)}>
                          <Edit />
                        </IconButton>
                        <IconButton color="secondary" onClick={() => handleDeleteVendor(vendor.id)}>
                          <Delete />
                        </IconButton>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default VendorCreation;
