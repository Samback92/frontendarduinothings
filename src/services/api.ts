export const fetchData = async <T>(url: string): Promise<T> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Nätverket svarar inte");
    }
    return response.json();
};

export const deleteData = async (url: string): Promise<void> => {
    const response = await fetch(url, { method: 'DELETE' });
    if (!response.ok) {
        throw new Error("Kunde inte ta bort data");
    }
};
