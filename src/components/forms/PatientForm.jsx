import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';

const PatientForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    contact: '',
    healthInfo: ''
  });

  useEffect(() => {
    if (initialData.id) {
      setFormData({
        name: initialData.name || '',
        dob: initialData.dob || '',
        contact: initialData.contact || '',
        healthInfo: initialData.healthInfo || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal" required fullWidth
        label="Full Name" name="name"
        value={formData.name} onChange={handleChange}
      />
      <TextField
        margin="normal" required fullWidth
        label="Date of Birth" name="dob" type="date"
        InputLabelProps={{ shrink: true }}
        value={formData.dob} onChange={handleChange}
      />
      <TextField
        margin="normal" required fullWidth
        label="Contact Info" name="contact"
        value={formData.contact} onChange={handleChange}
      />
      <TextField
        margin="normal" fullWidth multiline rows={3}
        label="Health Info (allergies, etc.)" name="healthInfo"
        value={formData.healthInfo} onChange={handleChange}
      />
      <Button
        type="submit" fullWidth variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        {initialData.id ? 'Save Changes' : 'Create Patient'}
      </Button>
    </Box>
  );
};

export default PatientForm;