import axios from 'axios';
import type {
  CreateTaskRequest,
  PageResponse,
  Task,
  TaskStatus,
  UpdateTaskStatusRequest,
} from '../types/task';

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error('VITE_API_URL no está definida en las variables de entorno');
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const apiMessage = error.response?.data?.message;
    if (apiMessage) {
      return apiMessage;
    }

    if (error.code === 'ERR_NETWORK') {
      return 'No se pudo conectar con el servidor';
    }

    return error.message || 'Ocurrió un error en la petición';
  }

  return 'Ocurrió un error inesperado';
};

export const getTasks = async (
  status?: TaskStatus,
  page: number = 0,
  size: number = 10,
  sortBy: string = 'createdAt',
  direction: string = 'desc'
): Promise<PageResponse<Task>> => {
  try {
    const response = await api.get<PageResponse<Task>>('', {
      params: {
        status,
        page,
        size,
        sortBy,
        direction,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const createTask = async (task: CreateTaskRequest): Promise<Task> => {
  try {
    const response = await api.post<Task>('', task);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const updateTaskStatus = async (
  id: number,
  request: UpdateTaskStatusRequest
): Promise<Task> => {
  try {
    const response = await api.patch<Task>(`/${id}/status`, request);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const deleteTask = async (id: number): Promise<void> => {
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};