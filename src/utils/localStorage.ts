export function saveToLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
}

export function loadFromLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
}
