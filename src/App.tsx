import { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTaskCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Task Manager</h1>
        <p>Gestión de tareas internas del equipo</p>
      </header>

      <main className="main-grid">
        <section className="card">
          <TaskForm onTaskCreated={handleTaskCreated} />
        </section>

        <section className="card">
          <TaskList refreshTrigger={refreshTrigger} />
        </section>
      </main>
    </div>
  );
}

export default App;