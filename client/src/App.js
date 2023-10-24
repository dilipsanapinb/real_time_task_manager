

import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './components/authentication/SignUp';
import TasksPage from './pages/TasksPage';
import AssignTask from './components/tasks/AssignTask';
import CompletedTask from './components/tasks/CompletedTask';
import GetProfile from './components/authentication/GetProfile';
import EditTask from './components/tasks/EditTask';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/tasks" element={<TasksPage />} />
      <Route path="/assign-tasks" element={<AssignTask />} />
      <Route path="/completed-tasks" element={<CompletedTask />} />
      <Route path="/profile" element={<GetProfile />} />
      <Route path="/edit/:taskId" element={<EditTask />} />
    </Routes>
  );
}

export default App;
