export class DateUtil {
    static readonly FULL_DAY_MILLIS = 1000 * 60 * 60 * 24;

    static daysInInterval(start: Date, end: Date): number {
        if (!start || !end ) {
            throw new Error('Start or end date missing.');
        }

        const intervalInMillis = end.getTime() - start.getTime();
        const daysInInterval = intervalInMillis / this.FULL_DAY_MILLIS;

        return Math.floor(daysInInterval);
    }

    static makeEndOfDay(date: Date): Date {
        return this.createTimeOfDay(date, 23, 59, 59);
    }

    static makeStartOfDay(date: Date): Date {
        return this.createTimeOfDay(date, 0, 0, 0);
    }

    static createTimeOfDay(date: Date, hour: number, minute: number, second: number): Date {
        if ((hour < 0) || (minute < 0) || (second < 0)) {
            throw new Error('A time argument was less than 0.');
        }

        if (hour > 23) {
            throw new Error('Hour cannot be over 23.');
        }

        if (minute > 59 || second > 59) {
            throw new Error('Minute or second cannot be over 59.');
        }

        let returnDate = new Date();
        returnDate.setTime(date.getTime());

        returnDate.setHours(hour);
        returnDate.setMinutes(minute);
        returnDate.setSeconds(second);
        returnDate.setMilliseconds(0);

        return returnDate;
    }
}
