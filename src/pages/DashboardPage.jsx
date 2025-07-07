import React from 'react';
import AppLayout from '../layouts/AppLayout';
import { useData } from '../context/DataContext';
import { Grid, Paper, Typography, List, ListItem, ListItemText, CircularProgress, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const StatCard = ({ title, value, children }) => (
    <Grid item xs={12} md={6} lg={4}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Typography component="h2" variant="subtitle1" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        {value && <Typography component="p" variant="h4">{value}</Typography>}
        {children}
      </Paper>
    </Grid>
  );

const DashboardPage = () => {
  const { patients, incidents, loading } = useData();

  if (loading) {
    return <AppLayout><CircularProgress /></AppLayout>;
  }

  const upcomingAppointments = incidents
    .filter(i => new Date(i.appointmentDate) > new Date())
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
    .slice(0, 10);

  const totalRevenue = incidents
    .filter(i => i.status === 'Completed' && i.cost)
    .reduce((sum, i) => sum + Number(i.cost), 0);

  const treatmentStatusCounts = incidents.reduce((acc, i) => {
    acc[i.status] = (acc[i.status] || 0) + 1;
    return acc;
  }, {});

  const patientIncidentCounts = incidents.reduce((acc, i) => {
    acc[i.patientId] = (acc[i.patientId] || 0) + 1;
    return acc;
  }, {});
  
  const topPatientIds = Object.keys(patientIncidentCounts)
    .sort((a, b) => patientIncidentCounts[b] - patientIncidentCounts[a])
    .slice(0, 5);
    
  const getPatientName = (patientId) => patients.find(p => p.id === patientId)?.name || 'Unknown';

  return (
    <AppLayout>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
        Admin Dashboard
      </Typography>
    
      <Grid container spacing={3} justifyContent="center">

        <StatCard title="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} />

        <StatCard title="Treatment Status">
          <Typography variant="h5">Completed: {treatmentStatusCounts['Completed'] || 0}</Typography>
          <Typography variant="h5">Pending: {treatmentStatusCounts['Pending'] || 0}</Typography>
          <Typography variant="h5">Canceled: {treatmentStatusCounts['Canceled'] || 0}</Typography>
        </StatCard>

        <StatCard title="Total Patients" value={patients.length} />

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%', borderRadius: '12px', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Next 10 Upcoming Appointments
            </Typography>
            <List dense>
              {upcomingAppointments.map(inc => (
                <ListItem key={inc.id} component={RouterLink} to={`/patient/${inc.patientId}`}>
                  <ListItemText
                    primary={`${inc.title} - ${getPatientName(inc.patientId)}`}
                    secondary={new Date(inc.appointmentDate).toLocaleString()}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%', borderRadius: '12px', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Top Patients (by number of appointments)
            </Typography>
            <List dense>
              {topPatientIds.map(pid => (
                <ListItem key={pid} component={RouterLink} to={`/patient/${pid}`}>
                  <ListItemText
                    primary={getPatientName(pid)}
                    secondary={`${patientIncidentCounts[pid]} appointments`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

      </Grid>
    </AppLayout>
  );
};
export default DashboardPage;