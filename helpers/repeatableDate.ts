export function getRepeatableDate(day: number, hours: number, minutes: number): string {
    return `${day}.${hours}:${minutes}`;
}

export function parseRepeatableDate(date: string): Date {
    if (!/^([0-6]\.[0-9]{1,2}\:[0-9]{1,2})$/gi.test(date)) {
        throw new Error(`Error parsing repeatable date: ${date}`);
    }

    const now = new Date();

    // Getting day from this string
    const day = Number(date.split(".")[0]);
    now.setDate(day + (7 * Math.round(now.getDate() / 7)));

    // Getting hours and minutes
    const hours = Number(date.split(".")[1].split(":")[0]);
    const minutes = Number(date.split(".")[1].split(":")[1]);

    now.setHours(hours);
    now.setMinutes(minutes);

    return now;
}