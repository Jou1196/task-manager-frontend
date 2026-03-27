import { useState } from 'react';
import { createTask } from '../services/taskService';
import type { CreateTaskRequest, TaskPriority, TaskStatus } from '../types/task';

interface TaskFormProps {
  onTaskCreated: () => void;
}

function TaskForm({ onTaskCreated }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('PENDING');
  const [priority, setPriority] = useState<TaskPriority>('MEDIUM');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload: CreateTaskRequest = {
      title,
      description,
      status,
      priority,
    };

    try {
      setLoading(true);
      setError(null);

      await createTask(payload);

      setTitle('');
      setDescription('');
      setStatus('PENDING');
      setPriority('MEDIUM');

      onTaskCreated();
    } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al crear la tarea');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="section-header">
        <h2>Crear Tarea</h2>
        <p>Completa el formulario para registrar una nueva tarea.</p>
      </div>

      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej. Implementar login"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe brevemente la tarea"
            rows={4}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="status">Estado</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
            >
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Done</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="priority">Prioridad</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
        </div>

        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? 'Guardando...' : 'Crear tarea'}
        </button>

        {error && <p className="error-text">{error}</p>}
      </form>
    </div>
  );
}

export default TaskForm;