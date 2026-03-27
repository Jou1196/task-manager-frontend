import { useEffect, useState } from 'react';
import { deleteTask, getTasks, updateTaskStatus } from '../services/taskService';
import type { PageResponse, Task, TaskStatus } from '../types/task';

interface TaskListProps {
  refreshTrigger: number;
}

function TaskList({ refreshTrigger }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [loading, setLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [pageData, setPageData] = useState<PageResponse<Task> | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      const statusParam =
        selectedStatus === 'ALL' ? undefined : (selectedStatus as TaskStatus);

      const response = await getTasks(statusParam, page, size, 'createdAt', 'desc');
      setTasks(response.content);
      setPageData(response);
    } catch (err) {
      setError('Error al cargar tareas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [refreshTrigger, selectedStatus, page]);

  const handleChangeStatus = async (task: Task) => {
    let nextStatus: TaskStatus;

    if (task.status === 'PENDING') {
      nextStatus = 'IN_PROGRESS';
    } else if (task.status === 'IN_PROGRESS') {
      nextStatus = 'DONE';
    } else {
      nextStatus = 'PENDING';
    }

    try {
      setActionLoadingId(task.id);
      await updateTaskStatus(task.id, { status: nextStatus });
      await fetchTasks();
    } catch (err) {
      setError('Error al actualizar el estado');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('¿Estás seguro de eliminar esta tarea?');

    if (!confirmed) {
      return;
    }

    try {
      setActionLoadingId(id);
      await deleteTask(id);
      await fetchTasks();
    } catch (err) {
      setError('Error al eliminar la tarea');
    } finally {
      setActionLoadingId(null);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  const formatStatus = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'Pending';
      case 'IN_PROGRESS':
        return 'In Progress';
      case 'DONE':
        return 'Done';
      default:
        return status;
    }
  };

  const formatPriority = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'High';
      case 'MEDIUM':
        return 'Medium';
      case 'LOW':
        return 'Low';
      default:
        return priority;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'badge badge-pending';
      case 'IN_PROGRESS':
        return 'badge badge-progress';
      case 'DONE':
        return 'badge badge-done';
      default:
        return 'badge';
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'badge badge-high';
      case 'MEDIUM':
        return 'badge badge-medium';
      case 'LOW':
        return 'badge badge-low';
      default:
        return 'badge';
    }
  };

  return (
    <div>
      <div className="section-header">
        <h2>Lista de Tareas</h2>
        <p>Visualiza y administra las tareas registradas.</p>
      </div>

      <div className="toolbar">
        <label htmlFor="statusFilter">Filtrar por estado</label>
        <select
          id="statusFilter"
          value={selectedStatus}
          onChange={(e) => {
            setSelectedStatus(e.target.value);
            setPage(0);
          }}
        >
          <option value="ALL">All</option>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>
      </div>

      {loading && <p className="info-text">Cargando tareas...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && tasks.length === 0 && (
        <p className="empty-text">No hay tareas registradas.</p>
      )}

      {!loading && !error && tasks.length > 0 && (
        <>
          <div className="task-list">
            {tasks.map((task) => (
              <article key={task.id} className="task-item">
                <div className="task-item-header">
                  <h3>{task.title}</h3>
                  <div className="task-badges">
                    <span className={getStatusClass(task.status)}>
                      {formatStatus(task.status)}
                    </span>
                    <span className={getPriorityClass(task.priority)}>
                      {formatPriority(task.priority)}
                    </span>
                  </div>
                </div>

                <p className="task-description">
                  {task.description || 'Sin descripción'}
                </p>

                <div className="task-meta">
                  <span>ID: {task.id}</span>
                  <span>Creado: {formatDate(task.createdAt)}</span>
                </div>

                <div className="task-actions">
                  <button
                    className="secondary-button"
                    onClick={() => handleChangeStatus(task)}
                    disabled={actionLoadingId === task.id}
                  >
                    {actionLoadingId === task.id ? 'Procesando...' : 'Cambiar estado'}
                  </button>

                  <button
                    className="danger-button"
                    onClick={() => handleDelete(task.id)}
                    disabled={actionLoadingId === task.id}
                  >
                    {actionLoadingId === task.id ? 'Eliminando...' : 'Eliminar'}
                  </button>
                </div>
              </article>
            ))}
          </div>

          {pageData && (
            <div className="pagination">
              <button
                className="secondary-button"
                onClick={() => setPage((prev) => prev - 1)}
                disabled={pageData.first}
              >
                Anterior
              </button>

              <span>
                Página {pageData.number + 1} de {pageData.totalPages}
              </span>

              <button
                className="secondary-button"
                onClick={() => setPage((prev) => prev + 1)}
                disabled={pageData.last}
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default TaskList;