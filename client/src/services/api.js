const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
    getAuthHeader() {
        const token = localStorage.getItem('amarTasks-token');
        return token ? { 'Authorization': `Bearer ${token}` } : {};
    }

    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...this.getAuthHeader(),
                ...options.headers,
            },
            ...options,
        };

        if (config.body && typeof config.body === 'object') {
            config.body = JSON.stringify(config.body);
        }

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    async register(userData) {
        return this.request('/users/register', {
            method: 'POST',
            body: userData,
        });
    }

    async login(credentials) {
        return this.request('/users/login', {
            method: 'POST',
            body: credentials,
        });
    }

    async getTasks() {
        return this.request('/tasks');
    }

    async createTask(task) {
        return this.request('/tasks', {
            method: 'POST',
            body: task,
        });
    }

    async updateTask(taskId, updates) {
        return this.request(`/tasks/${taskId}`, {
            method: 'PUT',
            body: updates,
        });
    }

    async deleteTask(taskId) {
        return this.request(`/tasks/${taskId}`, {
            method: 'DELETE',
        });
    }

    async getUser() {
        return this.request('/users/me');
    }
}

export const apiService = new ApiService();
export default apiService;
