import { proxy } from "valtio";

export const store = proxy({
    signedIn: false,
    list: [],
    dark: true,
    task: false
});

export const words = [
    {id: 0, text: "My"},
    {id: 1, text: "আমার"},
    {id: 2, text: "My"},
    {id: 3, text: "Meine"},
    {id: 4, text: "Mes"},
    {id: 5, text: "Мои"},
    {id: 6, text: "My"},
    {id: 7, text: "আমার"},
    {id: 8, text: "Meine"},
    {id: 9, text: "Mes"},
    {id: 11, text: "আমার"},
    {id: 10, text: "Мои"}
];

// Memoized calculation function
export const calculateRemaining = (remTime) => {
    const now = new Date();
    const [datePart, timePart] = remTime.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hour, minute] = timePart.split(':').map(Number);
    const target = new Date(year, month - 1, day, hour, minute);
    const diff = target - now;
    
    if (diff <= 0) return 'Overdue';
    
    const mins = Math.floor(diff / 60000) % 60;
    const hours = Math.floor(diff / 3600000) % 24;
    const days = Math.floor(diff / 86400000);
    
    const parts = [];
    if (days) parts.push(`${days}d`);
    if (hours) parts.push(`${hours}h`);
    parts.push(`${mins}m`);
    
    return parts.join(' ') + ' left';
};

// Memoized date formatting function
export const getLocalDateTime = (date = new Date()) => {
    const d = date;
    const pad = (n) => n.toString().padStart(2, '0');
    const year = d.getFullYear();
    const month = pad(d.getMonth() + 1);
    const day = pad(d.getDate());
    const hours = pad(d.getHours());
    const minutes = pad(d.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

// Memoized priority calculation
export const getPriority = (importance, urgency) => {
    if (importance > 2) {
        return urgency > 2 ? 1 : 3;
    } else {
        return urgency > 2 ? 2 : 4;
    }
};

// Debounce utility for performance
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};