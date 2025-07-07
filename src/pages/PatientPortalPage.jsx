import React from 'react';
import AppLayout from '../layouts/AppLayout';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Container, Typography, Paper, Box, List, ListItem, ListItemText, Divider, CircularProgress, Link } from '@mui/material';

const PatientPortalPage = () => {
  const { user } = useAuth();
  const { incidents, loading } = useData();

  if (loading || !user) {
    return <AppLayout><CircularProgress /></AppLayout>;
  }

  const myIncidents = incidents
    .filter(i => i.patientId === user.patientId)
    .sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate));

  const upcomingAppointments = myIncidents.filter(i => new Date(i.appointmentDate) > new Date());
  const pastAppointments = myIncidents.filter(i => new Date(i.appointmentDate) <= new Date());

  return (
    <AppLayout>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Welcome, {user.email}!</Typography>
        <Typography variant="h6" color="text.secondary">This is your personal health portal.</Typography>
        
        <Paper sx={{ p: 2, my: 4 }}>
          <Typography variant="h5" color="primary" gutterBottom>Upcoming Appointments</Typography>
          <List>
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map(inc => (
                <ListItem key={inc.id}>
                  <ListItemText
                    primary={inc.title}
                    secondary={`Scheduled for: ${new Date(inc.appointmentDate).toLocaleString()}`}
                  />
                </ListItem>
              ))
            ) : (
              <Typography>You have no upcoming appointments.</Typography>
            )}
          </List>
        </Paper>

        <Paper sx={{ p: 2, my: 4 }}>
          <Typography variant="h5" color="primary" gutterBottom>Appointment History</Typography>
          <List>
            {pastAppointments.length > 0 ? (
              pastAppointments.map((inc, index) => (
                <React.Fragment key={inc.id}>
                  <ListItem>
                    <ListItemText
                      primary={`${inc.title} on ${new Date(inc.appointmentDate).toLocaleDateString()}`}
                      secondary={
                        <Box component="span">
                          <Typography component="span" display="block">Status: {inc.status}</Typography>
                          {inc.cost && <Typography component="span" display="block">Cost: ${inc.cost}</Typography>}
                          {inc.treatment && <Typography component="span" display="block">Treatment: {inc.treatment}</Typography>}
                          {inc.files && inc.files.length > 0 && (
                            <Box component="span" display="block">
                              Files: {inc.files.map(file => (
                                <Link href={file.url} target="_blank" rel="noopener noreferrer" key={file.name} sx={{mr: 2}}>
                                  {file.name}
                                </Link>
                              ))}
                            </Box>
                          )}
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < pastAppointments.length - 1 && <Divider />}
                </React.Fragment>
              ))
            ) : (
              <Typography>You have no past appointments.</Typography>
            )}
          </List>
        </Paper>
      </Container>
    </AppLayout>
  );
};

export default PatientPortalPage;