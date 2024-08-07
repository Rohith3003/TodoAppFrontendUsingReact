import { apiClient } from "./ApiClient";

export const retrieveAllTodosForUser = (username) => apiClient.get(`/users/${username}/todos`);

export const deleteTodoAPI = (username, id) => apiClient.delete(`/users/${username}/todos/${id}`);

export const retrieveTodo = (username, id) => apiClient.get(`/users/${username}/todos/${id}`);

export const updateTodo = 
        (username, id, todo) => apiClient.put(`/users/${username}/todos/${id}`, todo);

export const createTodo = 
        (username, todo) => apiClient.put(`/users/${username}/todos`, todo);