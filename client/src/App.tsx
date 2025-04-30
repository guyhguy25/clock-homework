import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Manager from './pages/Manager';
import ProtectedRoute from './components/ProtectedRoute';
import ManagerProtectedRoute from './components/ManagerProtectedRoute';
import RedirectIfAuth from './components/RedirectIfAuth';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from '@mui/x-date-pickers';
import Employees from './pages/Employees';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <Routes>
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Sidebar />}>
              <Route path='/' element={<Dashboard />} />
              <Route path='/profile' element={<Profile />} />
              <Route element={<ManagerProtectedRoute />}>
                <Route path="/manager" element={<Manager />} />
                <Route path="/my-employee" element={<Employees />} />
              </Route>
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