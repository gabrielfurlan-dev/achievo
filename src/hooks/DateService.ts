import { format, parseISO } from "date-fns";

export function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = String(currentDate.getMonth() + 1);
    let day = String(currentDate.getDate());

    if (month.length === 1) {
        month = '0' + month;
    }
    if (day.length === 1) {
        day = '0' + day;
    }

    return `${year}-${month}-${day}`;
};

export function getWeekInterval(date: Date) {
    const currentDate = new Date(date);
    const currentDay = currentDate.getDay();
    const firstDayOfWeek = new Date(currentDate);
    const lastDayOfWeek = new Date(currentDate);

    firstDayOfWeek.setDate(currentDate.getDate() - currentDay);
    lastDayOfWeek.setDate(currentDate.getDate() + (6 - currentDay));

    return { firstDayOfWeek, lastDayOfWeek };
}

export function getFormatedWeekInterval(date: string) {
    const interval = getWeekInterval(stringToDate(date))
    return `${interval.firstDayOfWeek.toLocaleDateString().substring(0,5)} até ${interval.lastDayOfWeek.toLocaleDateString().substring(0,5)} de ${interval.lastDayOfWeek.getFullYear()}`
}

export function getFormatedDate(date: string) {
    return format(parseISO(date), 'dd/MM/yyyy')
}

export function stringToDate(date: string) {
    const parts = date.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);

    return new Date(year, month, day);
}
