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

    console.log(`${year}-${month}-${day}`);
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

    if (typeof navigator == 'undefined') {
        return getFormatedWeekIntervalBrazil(interval);
    }

    const userLocale = navigator.language;
    console.log(userLocale);

    if (userLocale.toUpperCase() == "PT-BR") {
        return getFormatedWeekIntervalBrazil(interval);
    }

    return getFormatedWeekIntervalOtherCountries(interval);
}

export function stringToDate(date: string) {
    const parts = date.split("-");
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const dateReport = new Date(year, month, day);

    return new Date(dateReport);
}

function getFormatedWeekIntervalBrazil(interval: IntervalWeek) {
    const firstPeriod: PeriodReport = getPeriod(interval.firstDayOfWeek);
    const lastPeriod: PeriodReport = getPeriod(interval.lastDayOfWeek);
    const firstDayFormatted = `${firstPeriod.day}/${firstPeriod.mounth}`;
    const lastDayFormatted = `${lastPeriod.day}/${lastPeriod.mounth}`;

    return `${firstDayFormatted} until ${lastDayFormatted} de ${interval.lastDayOfWeek.getFullYear()}`
}

function getFormatedWeekIntervalOtherCountries(interval: IntervalWeek) {
    const firstPeriod: PeriodReport = getPeriod(interval.firstDayOfWeek);
    const lastPeriod: PeriodReport = getPeriod(interval.lastDayOfWeek);

    const firstDayFormatted = `${firstPeriod.mounth}/${firstPeriod.day}`;
    const lastDayFormatted = `${lastPeriod.mounth}/${lastPeriod.day}`;

    return `${firstDayFormatted} until ${lastDayFormatted} de ${interval.lastDayOfWeek.getFullYear()}`;
}

function getPeriod(interval: Date) {
    const day = `${interval.getDate().toString().padStart(2, '0')}`
    const mounth = `${(interval.getMonth() + 1).toString().padStart(2, '0')}`
    return { day, mounth }
}
