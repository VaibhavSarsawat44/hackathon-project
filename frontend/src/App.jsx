import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import Community from './pages/Community';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-trip" element={<CreateTrip />} />
          <Route path="/build-itinerary" element={<BuildItinerary />} />
          <Route path="/my-trips" element={<UserTrips />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/search" element={<ActivitySearch />} />
          <Route path="/community" element={<Community />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
