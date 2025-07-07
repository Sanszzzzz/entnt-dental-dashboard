import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import AppLayout from '../layouts/AppLayout';
import IncidentForm from '../components/forms/IncidentForm';
import {
  Container, Typography, Paper, Box, Button, List, ListItem, ListItemText,
  Divider, CircularProgress, Modal, IconButton
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const PatientDetailPage = () => {
  const { patientId } = useParams();
  const { patients, incidents, loading, addIncident, updateIncident, deleteIncident } = useData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIncident, setEditingIncident] = useState(null);

  if (loading) {
    return <AppLayout><CircularProgress /></AppLayout>;
  }

  const patient = patients.find(p => p.id === patientId);
  const patientIncidents = incidents
    .filter(i => i.patientId === patientId)
    .sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate));

  const handleOpenModal = (incident) => {
    setEditingIncident(incident);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingIncident(null);
    setIsModalOpen(false);
  };

  const handleDelete = (incidentId) => {
    if (window.confirm('Are you sure you want to delete this incident?')) {
      deleteIncident(incidentId);
    }
  };

  const handleFormSubmit = (formData) => {
    const dataToSave = { ...formData, patientId };
    if (editingIncident) {
      updateIncident(editingIncident.id, dataToSave);
    } else {
      addIncident(dataToSave);
    }
    handleCloseModal();
  };

  if (!patient) {
    return <AppLayout><Typography variant="h5">Patient not found.</Typography></AppLayout>;
  }

  return (
    <AppLayout>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h4" gutterBottom>{patient.name}</Typography>
          <Typography><strong>Date of Birth:</strong> {patient.dob}</Typography>
          <Typography><strong>Contact:</strong> {patient.contact}</Typography>
          <Typography><strong>Health Info:</strong> {patient.healthInfo}</Typography>
        </Paper>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5">Appointments / Incidents</Typography>
          <Button variant="contained" onClick={() => handleOpenModal(null)}>Add New Incident</Button>
        </Box>

        <List component={Paper}>
          {patientIncidents.map((incident, index) => (
            <React.Fragment key={incident.id}>
              <ListItem
                alignItems="flex-start"
                secondaryAction={
                  <>
                    <IconButton edge="end" color="primary" onClick={() => handleOpenModal(incident)}><Edit /></IconButton>
                    <IconButton edge="end" color="error" onClick={() => handleDelete(incident.id)}><Delete /></IconButton>
                  </>
                }
              >
                <ListItemText
                  primary={`${incident.title} - ${new Date(incident.appointmentDate).toLocaleString()}`}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">Status: {incident.status}</Typography>
                      {incident.cost && <Typography component="span" variant="body2" color="text.primary"> | Cost: ${incident.cost}</Typography>}
                      <br />
                      {incident.description}
                    </>
                  }
                />
              </ListItem>
              {index < patientIncidents.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>

        <Modal open={isModalOpen} onClose={handleCloseModal}>
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              {editingIncident ? 'Edit Incident' : 'Add New Incident'}
            </Typography>
            <IncidentForm
              onSubmit={handleFormSubmit}
              initialData={editingIncident || {}}
            />
          </Box>
        </Modal>
      </Container>
    </AppLayout>
  );
};

export default PatientDetailPage;