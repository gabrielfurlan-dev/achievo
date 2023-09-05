import { format } from "date-fns";

type IntervalWeek = {
    firstDayOfWeek: Date,
    lastDayOfWeek: Date
}

export function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = String(currentDate.getMonth() + 1);
    let day = String(currentDate.getDate());

    if (month.length === 1) {
        month = "0" + month;
    }
    if (day.length === 1) {
        day = "0" + day;
    }

    return `${month}-${month}-${day}`;
}

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
    const interval = getWeekInterval(stringToDate(date));
    const userLocale = navigator.language;

    if (userLocale.toUpperCase() == "PT-BR") {

        return getFormatedWeekIntervalBrazil(interval);

    }


    return getFormatedWeekIntervalOtherCountries(interval);
    
}

function getFormatedDate(originalDate: Date) {
    const formattedDate = format(originalDate, "MM/dd/yyyy");
    return new Date(formattedDate);
}

export function stringToDate(date: string) {
    const parts = date.split("-");
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);

    const dateReport = new Date(year, month, day);

    return new Date(getFormatedDate(dateReport));
}


function getFormatedWeekIntervalBrazil(interval: IntervalWeek) {
    const firstDayFormatted = `${interval.firstDayOfWeek.getDate().toString().padStart(2, '0')}/${(interval.firstDayOfWeek.getMonth() + 1).toString().padStart(2, '0')}`;
    const lastDayFormatted = `${interval.lastDayOfWeek.getDate().toString().padStart(2, '0')}/${(interval.lastDayOfWeek.getMonth() + 1).toString().padStart(2, '0')}`;

    return `${firstDayFormatted} até ${lastDayFormatted} de ${interval.lastDayOfWeek.getFullYear()}`
}

function getFormatedWeekIntervalOtherCountries(interval: IntervalWeek){
    const firstDayFormatted = `${(interval.firstDayOfWeek.getMonth() + 1).toString().padStart(2, '0')}/${interval.firstDayOfWeek.getDate().toString().padStart(2, '0')}`;
    const lastDayFormatted = `${(interval.lastDayOfWeek.getMonth() + 1).toString().padStart(2, '0')}/${interval.lastDayOfWeek.getDate().toString().padStart(2, '0')}`;

    return `${firstDayFormatted} até ${lastDayFormatted} de ${interval.lastDayOfWeek.getFullYear()}`;
}