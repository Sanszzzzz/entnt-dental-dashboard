const APP_DATA_KEY = 'entntDentalApp';

const sampleData = {
  users: [
    { id: '1', role: 'Admin', email: 'admin@entnt.in', password: 'admin123' },
    { id: '2', role: 'Patient', email: 'john@entnt.in', password: 'patient123', patientId: 'p1' }
  ],
  patients: [
    {
      id: 'p1',
      name: 'John Doe',
      dob: '1990-05-10',
      contact: '1234567890',
      healthInfo: 'No allergies'
    },
    {
      id: 'p2',
      name: 'Jane Smith',
      dob: '1985-08-22',
      contact: '0987654321',
      healthInfo: 'Sensitive to cold.'
    }
  ],
  incidents: [
    {
      id: 'i1',
      patientId: 'p1',
      title: 'Toothache',
      description: 'Upper molar pain',
      comments: 'Sensitive to cold',
      appointmentDate: '2023-07-01T10:00:00',
      cost: 80,
      status: 'Completed',
      files: [
        { name: 'invoice.pdf', url: '...' },
        { name: 'xray.png', url: '...' }
      ]
    },
    {
      id: 'i2',
      patientId: 'p1',
      title: 'Annual Checkup',
      description: 'Routine cleaning and checkup.',
      comments: '',
      appointmentDate: '2025-08-15T14:00:00',
      cost: 50,
      status: 'Pending',
      files: []
    },
    {
      id: 'i3',
      patientId: 'p2',
      title: 'Wisdom Tooth Pain',
      description: 'Pain in the lower right jaw.',
      comments: '',
      appointmentDate: '2025-07-20T09:00:00',
      cost: 150,
      status: 'Pending',
      files: []
    }
  ]
};

// --- Core Functions ---

/**
 * Initializes the data in localStorage if it doesn't exist.
 * This function should be called once when the app starts.
 */
export const initializeData = () => {
  const data = localStorage.getItem(APP_DATA_KEY);
  if (!data) {
    localStorage.setItem(APP_DATA_KEY, JSON.stringify(sampleData));
    console.log('App data initialized in localStorage.');
  }
};

/**
 * Retrieves all application data from localStorage.
 * @returns {object} The parsed application data.
 */
export const getData = () => {
  const data = localStorage.getItem(APP_DATA_KEY);
  return data ? JSON.parse(data) : {};
};

/**
 * Saves the entire application data object to localStorage.
 * @param {object} data The complete data object to save.
 */
export const saveData = (data) => {
  localStorage.setItem(APP_DATA_KEY, JSON.stringify(data));
};