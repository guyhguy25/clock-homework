import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Employees from './pages/Employees';
import Timesheet from './pages/Timesheet';
import ManagerApprove from './pages/ManagerApprove';
import ProtectedRoute from './components/ProtectedRoute';
import RedirectIfAuth from './components/RedirectIfAuth';
import ClockIn from './pages/ClockIn';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from '@mui/x-date-pickers';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <Routes>
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Sidebar />}>
              <Route path='/' element={<Dashboard />} />
              <Route path='/timesheet' element={<Timesheet />} />
              <Route path='/profile' element={<Profile />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/manager-approve" element={<ManagerApprove />} />
              <Route path="/clock-in" element={<ClockIn />} />
            </Route>
          </Route>
          <Route element={<RedirectIfAuth />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </Router>
    </LocalizationProvider>
  );
}

export default App;