import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateTrip from './pages/CreateTrip';
import BuildItinerary from './pages/BuildItinerary';
import UserTrips from './pages/UserTrips';
import UserProfile from './pages/UserProfile';
import ActivitySearch from './pages/ActivitySearch';
import TripNotes from './pages/TripNotes';
import ExpenseInvoice from './pages/ExpenseInvoice';
import AdminPanel from './pages/AdminPanel';
import { isLoggedIn } from './services/authService';

// Protected Route — redirects to /login if no token
const ProtectedRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
};

// Public Only Route — redirects to /dashboard if already logged in
const PublicRoute = ({ children }) => {
  return !isLoggedIn() ? children : <Navigate to="/dashboard" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

          {/* Protected pages */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/create-trip" element={<ProtectedRoute><CreateTrip /></ProtectedRoute>} />
          <Route path="/build-itinerary" element={<ProtectedRoute><BuildItinerary /></ProtectedRoute>} />
          <Route path="/my-trips" element={<ProtectedRoute><UserTrips /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><ActivitySearch /></ProtectedRoute>} />
          <Route path="/notes" element={<ProtectedRoute><TripNotes /></ProtectedRoute>} />
          <Route path="/invoice" element={<ProtectedRoute><ExpenseInvoice /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
