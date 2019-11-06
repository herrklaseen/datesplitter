import 'mocha';
import { use } from 'chai';
import { expect } from 'chai';
import chaiString = require('chai-string');
use(chaiString);

import moment = require('moment');

import { TestUtils as TU } from './TestUtils';
import { DateSplitter } from '../src/DateSplitter';

const defaultDateFormat = 'YYYY-MM-DD HH:mm:ss';

describe('TimeLimited split()', () => {
    describe('with one part', () => {
        it('should return date and time at start of time limit', () => {
            const start = moment('2018-04-01').toDate();

            const ds = new DateSplitter(start, start);
            const result = ds.split(1, { startHour: 8, endHour: 18 })[0];

            expect(moment(result).format(defaultDateFormat))
                .to.startWith('2018-04-01 08:00:00');
        });
    });

    describe('with two parts and one day', () => {
        it('should return date and time at start and end of time limit', () => {
            const start = moment('2018-04-01').toDate();

            const ds = new DateSplitter(start, start);
            const result = ds.split(2, { startHour: 8, endHour: 18 });

            expect(moment(result[0]).format(defaultDateFormat))
                .to.startWith('2018-04-01 08:00:00');
            expect(moment(result[1]).format(defaultDateFormat))
                .to.startWith('2018-04-01 18:59:59');
        });
    });

    describe('with two parts and two days', () => {
        it('should return date and time at start of time limit on two different dates', () => {
            const start = moment('2018-04-01').toDate();
            const end = moment('2018-04-02').toDate();
            const ds = new DateSplitter(start, end);
            const result = ds.split(2, { startHour: 8, endHour: 18 });


            expect(moment(result[0]).format(defaultDateFormat))
                .to.startWith('2018-04-01 08:00:00');
            expect(moment(result[1]).format(defaultDateFormat))
                .to.startWith('2018-04-02 08:00:00');
        });
    });

    describe('with three parts and two days', () => {
        it('should return date and time at start and end of time limit on two different dates', () => {
            const start = moment('2018-04-01').toDate();
            const end = moment('2018-04-02').toDate();
            const ds = new DateSplitter(start, end);
            const result = ds.split(3, { startHour: 8, endHour: 18 });


            expect(moment(result[0]).format(defaultDateFormat))
                .to.startWith('2018-04-01 08:00:00');
            expect(moment(result[1]).format(defaultDateFormat))
                .to.startWith('2018-04-02 08:00:00');
            expect(moment(result[2]).format(defaultDateFormat))
                .to.startWith('2018-04-02 18:59:59');
        });
    });
});
