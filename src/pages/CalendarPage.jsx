import React, { useState } from 'react';
import AppLayout from '../layouts/AppLayout';
import { useData } from '../context/DataContext';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const localizer = momentLocalizer(moment);

const CustomToolbar = ({ label, onNavigate }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
        marginBottom: '1rem',
      }}
    >
      <IconButton onClick={() => onNavigate('PREV')}>
        <ChevronLeft />
      </IconButton>
      
      <Typography variant="h5" component="span">
        {label}
      </Typography>
      
      <IconButton onClick={() => onNavigate('NEXT')}>
        <ChevronRight />
      </IconButton>
    </div>
  );
};

const CalendarPage = () => {
  const { incidents, patients } = useData();
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());

  const events = incidents.map(incident => {
    const patient = patients.find(p => p.id === incident.patientId);
    return {
      id: incident.id,
      title: `${incident.title} - ${patient ? patient.name : 'Unknown'}`,
      start: new Date(incident.appointmentDate),
      end: new Date(incident.appointmentDate),
      resource: incident,
    };
  });

  const handleSelectEvent = (event) => navigate(`/patient/${event.resource.patientId}`);
  const handleNavigate = (newDate) => setDate(newDate);

  return (
    <AppLayout>
      <Container maxWidth="xl" sx={{ mt: 4, height: '85vh' }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Appointment Calendar
        </Typography>
        
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={['month']}
          defaultView="month"
          style={{ height: '100%' }}
          onSelectEvent={handleSelectEvent}
          date={date}
          onNavigate={handleNavigate}
          components={{
            toolbar: CustomToolbar,
          }}
          popup
        />
      </Container>
    </AppLayout>
  );
};

export default CalendarPage;