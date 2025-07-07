import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

import { AdminRoute, PatientRoute } from './components/RoleBasedRoute';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PatientsPage from './pages/PatientsPage';
import PatientDetailPage from './pages/PatientDetailPage';
import CalendarPage from './pages/CalendarPage';
import PatientPortalPage from './pages/PatientPortalPage';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<AdminRoute><DashboardPage /></AdminRoute>} />
            <Route path="/patients" element={<AdminRoute><PatientsPage /></AdminRoute>} />
            <Route path="/patient/:patientId" element={<AdminRoute><PatientDetailPage /></AdminRoute>} />
            <Route path="/calendar" element={<AdminRoute><CalendarPage /></AdminRoute>} />
            <Route path="/my-portal" element={<PatientRoute><PatientPortalPage /></PatientRoute>} /> 

          </Routes>
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;