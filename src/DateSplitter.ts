import { DateUtil } from './DateUtil';
import { Allotter } from './Allotter';

export class DateSplitter {
    private start: Date;
    private end: Date;
    private intervalStart: number = 0;
    private intervalEnd: number = 23;

    constructor(start: Date, end: Date) {
        if (!start) {
            throw new Error('A start Date must be provided.');
        }

        this.start = start;
        this.end = end;

        if (!this.end) {
            this.end = this.start;
        } 
    }

    public split(parts: number, options?: any): Date[] {
        this.parseOptions(options);

        const fullDays = DateUtil.daysInInterval(this.start, this.end);
        const slots = fullDays + 1;
        const distribution = Allotter.allot(parts , slots);
        const returnDates: Date[] = [];

        for (let dayIndex = 0; dayIndex < distribution.length; dayIndex++) {
            const dateAtIndex = new Date(this.start.getTime());
            dateAtIndex.setDate(dateAtIndex.getDate() + dayIndex);

            const duration = this.getDurationAtDate(dateAtIndex);
            // Divide the duration with the number of parts at the current slot, 
            // but remove one from the parts to eventually get dates that
            // start and end exactly at the specified interval.
            const divisor = distribution[dayIndex] === 1 ? distribution[dayIndex] : distribution[dayIndex] - 1;
            const interval = Math.floor(
                this.getDurationInMillis(duration[0], duration[1]) / divisor
            );

            for (let j = 0; j < distribution[dayIndex]; j++) {
                let aDate = new Date(duration[0].getTime() + (j * interval));
                returnDates.push(aDate);
            }
        }

        return returnDates;
    }

    private getDurationAtDate(date: Date): Date[] {
        const durationStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), this.intervalStart, 0, 0);
        const durationEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate(), this.intervalEnd, 59, 59);

        return [durationStart, durationEnd];
    }

    private getDurationInMillis(start: Date, end: Date): number {
        return end.getTime() - start.getTime();
    }

    private parseOptions(options: any) {
        if (!options) { return; }

        this.intervalStart = options.startHour;
        this.intervalEnd = options.endHour;
    }
}
