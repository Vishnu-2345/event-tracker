import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading app...</div>;
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" replace />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;