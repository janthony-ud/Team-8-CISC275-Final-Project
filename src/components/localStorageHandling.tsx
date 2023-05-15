// localStorageUtils.js
import { Movie } from "../interfaces/movie";

// Get an item from localStorage
export function getItem(key: string) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}

// Set an item in localStorage
export function setItem(key: string, value: Movie[]) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Remove an item from localStorage
export function removeItem(key: string) {
    localStorage.removeItem(key);
}
