import { proxy } from "valtio";

export const store = proxy({
    signedIn: false,
    list: []
});

export const calculateRemaining = (remTime) => {
    const now = new Date();
    const [datePart, timePart] = remTime.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hour, minute] = timePart.split(':').map(Number);
    const target = new Date(year, month - 1, day, hour, minute);
    const diff = target - now;
    if (diff <= 0)
        return 'Overdue';
    const mins = Math.floor(diff / 60000) % 60;
    const hours = Math.floor(diff / 3600000) % 24;
    const days = Math.floor(diff / 86400000);
    const parts = [];
    if (days)
        parts.push(`${days}d`);
    if (hours)
        parts.push(`${hours}h`);
    parts.push(`${mins}m`);
    return parts.join(' ') + ' left';
};

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

export const getPriority = (importance, urgency) => {
    if (importance > 2) {
        if (urgency > 2) {
            return 1;
        } else {
            return 3;
        }
    } else {
        if (urgency > 2) {
            return 2;
        } else {
            return 4;
        }
    }
}