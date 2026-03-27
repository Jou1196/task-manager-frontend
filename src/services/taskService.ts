import axios from 'axios';
import type {
  CreateTaskRequest,
  PageResponse,
  Task,
  TaskStatus,
  UpdateTaskStatusRequest,
} from '../types/task';

const API_URL = 'http://localhost:8080/api/tasks';

export const getTasks = async (
  status?: TaskStatus,
  page: number = 0,
  size: number = 10,
  sortBy: string = 'createdAt',
  direction: string = 'desc'
): Promise<PageResponse<Task>> => {
  const response = await axios.get<PageResponse<Task>>(API_URL, {
    params: {
      status,
      page,
      size,
      sortBy,
      direction,
    },
  });

  return response.data;
};

export const createTask = async (task: CreateTaskRequest): Promise<Task> => {
  const response = await axios.post<Task>(API_URL, task);
  return response.data;
};

export const updateTaskStatus = async (
  id: number,
  request: UpdateTaskStatusRequest
): Promise<Task> => {
  const response = await axios.patch<Task>(`${API_URL}/${id}/status`, request);
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};