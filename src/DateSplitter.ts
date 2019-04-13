import { DateUtil } from './DateUtil';

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
        const partsPerDay = parts / fullDays;
        let dayCounter = 0;
        let partCounter = 0;

        while (dayCounter <= fullDays) {
            dayCounter++;
        }
        const duration = this.getDurationAtDate(this.start);


        if (parts === 1) {
            return [duration[0]];
        }

        let interval = Math.floor(this.getDurationInMillis(duration[0], duration[1]) / (parts - 1));

        let returnDates: Date[] = [];

        for (let i = 0; i < parts; i++) {
            let aDate = new Date(duration[0].getTime() + (i * interval));
            returnDates.push(aDate);
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
