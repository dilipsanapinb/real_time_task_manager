
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './components/authentication/SignUp';
import TasksPage from './pages/TasksPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/tasks" element={<TasksPage />} />
    </Routes>
  );
}

export default App;
