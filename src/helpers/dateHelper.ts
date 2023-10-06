import { format } from "date-fns";
import LanguageDetector from 'i18next-browser-languagedetector';

type IntervalWeek = {
    firstDayOfWeek: Date,
    lastDayOfWeek: Date
}

type PeriodReport = {
    day: string;
    mounth: string;
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

    return `${year}-${month}-${day}`;
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
    console.log(userLocale.toUpperCase())

    if (userLocale.toUpperCase() == "PT-BR") {

        return getFormatedWeekIntervalBrazil(interval);

    }


     return getFormatedWeekIntervalOtherCountries(interval);

}

function getFormatedDate(originalDate: Date) {
    console.log(originalDate)
   const formattedDate = format(originalDate, "MM/dd/yyyy");
    return new Date(originalDate);
}

export function stringToDate(date: string) {
    const parts = date.split("-");
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);

    const dateReport = new Date(year, month, day);

    console.log(getFormatedDate(dateReport));

     return new Date(dateReport);
}

function getFormatedWeekIntervalBrazil(interval: IntervalWeek) {

    const firstPeriod: PeriodReport = getPeriod(interval.firstDayOfWeek);
    const lastPeriod: PeriodReport = getPeriod(interval.firstDayOfWeek);
    const firstDayFormatted = `${firstPeriod.day}/${firstPeriod.mounth}`;
    const lastDayFormatted = `${lastPeriod.day}/${lastPeriod.mounth}`;

    return `${firstDayFormatted} até ${lastDayFormatted} de ${interval.lastDayOfWeek.getFullYear()}`
}

function getFormatedWeekIntervalOtherCountries(interval: IntervalWeek) {

    const firstPeriod: PeriodReport = getPeriod(interval.firstDayOfWeek);
    const lastPeriod: PeriodReport = getPeriod(interval.lastDayOfWeek);

    const firstDayFormatted = `${firstPeriod.mounth}/${firstPeriod.day}`;
    const lastDayFormatted = `${lastPeriod.mounth}/${lastPeriod.day}`;

    return `${firstDayFormatted} até ${lastDayFormatted} de ${interval.lastDayOfWeek.getFullYear()}`;
}



function getPeriod(interval: Date) {

    const day = `${interval.getDate().toString().padStart(2, '0')}`
    const mounth = `${(interval.getMonth() + 1).toString().padStart(2, '0')}`

    return { day, mounth }
}
