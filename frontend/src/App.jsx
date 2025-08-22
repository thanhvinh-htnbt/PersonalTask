import LoginPage from './pages/loginPage.jsx';
import RegisterPage from './pages/registerPage.jsx';
import TaskPage from './pages/taskPage.jsx';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/tasks" element={<TaskPage />} />
    </Routes>    
  )
}

export default App;
