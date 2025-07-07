import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useData } from '../context/DataContext';
import AppLayout from '../layouts/AppLayout';
import PatientForm from '../components/forms/PatientForm';
import {
  Container, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Box, Button, Modal
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const PatientsPage = () => {
  const { patients, addPatient, updatePatient, deletePatient } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);

  const handleOpenModal = (patient) => {
    setEditingPatient(patient);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingPatient(null);
    setIsModalOpen(false);
  };

  const handleDelete = (patientId) => {
    if (window.confirm('Are you sure you want to delete this patient and all their incidents?')) {
      deletePatient(patientId);
    }
  };

  const handleFormSubmit = (formData) => {
    if (editingPatient) {
      updatePatient(editingPatient.id, formData);
    } else {
      addPatient(formData);
    }
    handleCloseModal();
  };

  return (
    <AppLayout>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h1">
            Patient Management
          </Typography>
          <Button variant="contained" onClick={() => handleOpenModal(null)}>Add New Patient</Button>
        </Box>
        
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>Contact Info</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>
                        <RouterLink to={`/patient/${patient.id}`}>
                            {patient.name}
                        </RouterLink>
                  </TableCell>
                  <TableCell>{patient.dob}</TableCell>
                  <TableCell>{patient.contact}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleOpenModal(patient)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(patient.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          aria-labelledby="patient-form-modal-title"
        >
          <Box sx={style}>
            <Typography id="patient-form-modal-title" variant="h6" component="h2">
              {editingPatient ? 'Edit Patient' : 'Add New Patient'}
            </Typography>
            <PatientForm
              onSubmit={handleFormSubmit}
              initialData={editingPatient || {}}
            />
          </Box>
        </Modal>
      </Container>
    </AppLayout>
  );
};

export default PatientsPage;