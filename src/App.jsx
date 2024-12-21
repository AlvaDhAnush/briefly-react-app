import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Preferences from './pages/Preferences';
import Navbar from './components/Navbar';

// Main App component
const App = () => {
  return (
    <div className="min-h-screen w-full bg-[#f9f2ec]">
      {/* Navbar is always displayed */}
      <Navbar />
      {/* Defining the application routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/headlines" element={<Home />} />
        <Route path="/preferences" element={<Preferences />} />
      </Routes>
    </div>
  );
};

export default App;
