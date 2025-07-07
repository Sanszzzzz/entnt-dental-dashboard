import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

const IncidentForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    title: '', description: '', appointmentDate: '', status: 'Pending',
    cost: '', treatment: '', comments: '', files: []
  });

  useEffect(() => {
    if (initialData.id) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        appointmentDate: initialData.appointmentDate ? initialData.appointmentDate.substring(0, 16) : '',
        status: initialData.status || 'Pending',
        cost: initialData.cost || '',
        treatment: initialData.treatment || '',
        comments: initialData.comments || '',
        files: initialData.files || []
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newFiles = await Promise.all(
      selectedFiles.map(async (file) => ({
        name: file.name,
        url: await toBase64(file),
      }))
    );
    setFormData(prev => ({ ...prev, files: [...prev.files, ...newFiles] }));
  };
  
  const removeFile = (fileName) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter(f => f.name !== fileName)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField margin="normal" required fullWidth label="Title" name="title" value={formData.title} onChange={handleChange} />
      <TextField margin="normal" required fullWidth label="Appointment Date" name="appointmentDate" type="datetime-local" InputLabelProps={{ shrink: true }} value={formData.appointmentDate} onChange={handleChange} />
      <TextField margin="normal" fullWidth multiline rows={2} label="Description" name="description" value={formData.description} onChange={handleChange} />
      <hr/>
      <Typography sx={{mt: 2}}>After Appointment:</Typography>
      <TextField margin="normal" fullWidth label="Status" name="status" select SelectProps={{ native: true }} value={formData.status} onChange={handleChange}>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
        <option value="Canceled">Canceled</option>
      </TextField>
      <TextField margin="normal" fullWidth label="Cost ($)" name="cost" type="number" value={formData.cost} onChange={handleChange} />
      <TextField margin="normal" fullWidth multiline rows={2} label="Treatment Provided" name="treatment" value={formData.treatment} onChange={handleChange} />
      <TextField margin="normal" fullWidth multiline rows={2} label="Comments / Notes" name="comments" value={formData.comments} onChange={handleChange} />
      
      <Typography sx={{mt: 2}}>Files (Invoices, X-Rays, etc.)</Typography>
      <Button variant="contained" component="label" sx={{mb: 1}}>
        Upload Files <input type="file" hidden multiple onChange={handleFileChange} />
      </Button>

      <List dense>
        {formData.files.map(file => (
          <ListItem key={file.name} secondaryAction={<IconButton edge="end" onClick={() => removeFile(file.name)}><Delete/></IconButton>}>
            <ListItemText primary={file.name} />
          </ListItem>
        ))}
      </List>

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {initialData.id ? 'Save Changes' : 'Create Incident'}
      </Button>
    </Box>
  );
};

export default IncidentForm;