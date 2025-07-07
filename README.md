# ENTNT Dental Center Management Dashboard

A comprehensive frontend application built for a technical assignment from ENTNT. This project is a fully-featured dashboard for managing patients and their dental appointments, built with React and Material-UI. The application is entirely client-side, using `localStorage` to simulate a database.

---

### **Live Demo**

**[Your Deployed Link Will Go Here]**

---

### **Key Features**

*   **Dual User Roles:**
    *   **Admin (Dentist):** Full access to all patient data, appointment scheduling, and management features.
    *   **Patient:** A secure, read-only portal to view personal appointment history and details.
*   **Secure Authentication:** Simulated login system with role-based access control (RBAC) and persistent sessions via `localStorage`.
*   **Admin Dashboard:** A central hub displaying key performance indicators (KPIs) such as total revenue, treatment status breakdowns, and upcoming appointments.
*   **Patient Management (CRUD):** Admins can View, Add, Edit, and Delete patient records.
*   **Appointment Management (CRUD):** Admins can manage multiple appointments (incidents) per patient, including post-appointment details like cost, treatment notes, and status.
*   **Simulated File Uploads:** A system to "upload" and attach treatment records (e.g., invoices, x-rays) to appointments. Files are converted to Base64 and stored in `localStorage`.
*   **Interactive Calendar:** A professional, full-page calendar component (`react-big-calendar`) for a clear visual overview of the monthly schedule.
*   **Fully Responsive Design:** The entire application is optimized for a seamless experience on desktop, tablet, and mobile devices.

---

### **Tech Stack**

*   **Framework:** **React 18** (with Vite)
*   **UI Library:** **Material-UI (MUI) v5**
*   **Routing:** **React Router DOM v6**
*   **State Management:** **React Context API**
*   **Calendar:** **React Big Calendar**
*   **Data Persistence:** Browser **LocalStorage**
*   **Unique IDs:** `uuid` library

---

### **Getting Started Locally**

To run this project on your local machine, follow these steps:

1.  **Clone the Repository**
    ```bash
    git clone [Your-GitHub-Repo-Link-Will-Go-Here]
    ```
2.  **Navigate to the Project Directory**
    ```bash
    cd entnt-dental-dashboard
    ```
3.  **Install Dependencies**
    ```bash
    npm install
    ```
4.  **Start the Development Server**
    ```bash
    npm run dev
    ```
5.  Open your browser and go to `http://localhost:5173`.

---

### **Available Login Credentials**

*   **Admin Account:**
    *   **Email:** `admin@entnt.in`
    *   **Password:** `admin123`
*   **Patient Account:**
    *   **Email:** `john@entnt.in`
    *   **Password:** `patient123`

---

### **Architectural Decisions & Technical Notes**

*   **State Management:** The **Context API** was chosen for its simplicity and native integration with React. It was ideal for managing global state like the authenticated user and application data without the boilerplate of a larger library like Redux. The state is logically partitioned into `AuthContext` and `DataContext` for clean separation of concerns.

*   **Styling:** **Material-UI (MUI)** was selected to rapidly build a clean, modern, and responsive user interface. A custom theme (`theme.js`) was implemented to centralize design tokens like colors, typography, and default component styles (e.g., for `Paper` and `Button`), ensuring a consistent look and feel across the application.

*   **File Handling Simulation:** To adhere to the "no backend" constraint, the file upload feature uses the browser's **`FileReader` API**. Selected files are converted into **Base64 Data URLs**, which are text-based representations of the files. These strings are then stored in `localStorage`, making the entire application state self-contained on the client-side.

*   **Code Structure:** The project follows a standard feature-based directory structure (`/pages`, `/components`, `/context`, etc.) to keep the codebase organized, scalable, and easy to navigate.