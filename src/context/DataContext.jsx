import React, { createContext, useState, useContext, useEffect } from 'react';
import { getData, saveData } from '../api/storage';
import { v4 as uuidv4 } from 'uuid';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const appData = getData();
    setPatients(appData.patients || []);
    setIncidents(appData.incidents || []);
    setLoading(false);
  }, []);

  const updateAndSaveData = (newPatients, newIncidents) => {
    setPatients(newPatients);
    setIncidents(newIncidents);
    const appData = { ...getData(), patients: newPatients, incidents: newIncidents };
    saveData(appData);
  };


  const addPatient = (patientData) => {
    const newPatient = { ...patientData, id: `p-${uuidv4()}` }; 
    const newPatients = [...patients, newPatient];
    updateAndSaveData(newPatients, incidents);
  };

  const updatePatient = (patientId, updatedData) => {
    const newPatients = patients.map(p => 
      p.id === patientId ? { ...p, ...updatedData } : p
    );
    updateAndSaveData(newPatients, incidents);
  };
  
  const deletePatient = (patientId) => {
    const newPatients = patients.filter(p => p.id !== patientId);
    const newIncidents = incidents.filter(i => i.patientId !== patientId);
    updateAndSaveData(newPatients, newIncidents);
  };

  const addIncident = (incidentData) => {
    const newIncident = { ...incidentData, id: `i-${uuidv4()}` };
    const newIncidents = [...incidents, newIncident];
    updateAndSaveData(patients, newIncidents);
  };

  const updateIncident = (incidentId, updatedData) => {
    const newIncidents = incidents.map(i =>
      i.id === incidentId ? { ...i, ...updatedData } : i
    );
    updateAndSaveData(patients, newIncidents);
  };
  
  const deleteIncident = (incidentId) => {
    const newIncidents = incidents.filter(i => i.id !== incidentId);
    updateAndSaveData(patients, newIncidents);
  };

  const value = {
    patients,
    incidents,
    loading,
    addPatient,
    updatePatient,
    deletePatient,
    addIncident,
    updateIncident,
    deleteIncident
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  return useContext(DataContext);
};