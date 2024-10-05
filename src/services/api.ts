const BASE_URL = 'http://localhost:8080';

export const fetchData = async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
        throw new Error("Network not responding");
    }
    return response.json();
};

export const deleteData = async (endpoint: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, { method: 'DELETE' });
    if (!response.ok) {
        throw new Error("Unable to delete data");
    }
};
