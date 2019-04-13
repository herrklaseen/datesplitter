import 'mocha';
import { use } from 'chai';
import { expect } from 'chai';
import chaiString = require('chai-string');
use(chaiString);

import moment = require('moment');

import { TestUtils as TU } from './TestUtils';
import { DateSplitter } from '../src/DateSplitter';

const defaultDateFormat = 'YYYY-MM-DD HH:mm:ss';

describe('Basic split()', () => {

    describe('with one part', () => {
        it('should return a date and time at start of interval', () => {
            const start = moment('2018-04-01').toDate();
            const ds = new DateSplitter(start, start);
            const result = ds.split(1)[0];
            const dateString = moment(result).format(defaultDateFormat);

            expect(dateString)
                .to.startWith('2018-04-01 00:00:00');
        });

        it('should return one date', () => {
            const start = moment('2018-04-01').toDate();
            const ds = new DateSplitter(start, start);
            const result = ds.split(1);

            expect(result.length).to.equal(1);
        });
    })

    describe('with two parts', () => {
        it('should return two date objects with time at start and end of interval', () => {
            const start = moment('2018-04-01').toDate();
            const ds = new DateSplitter(start, start);
            const result = ds.split(2);

            expect(moment(result[0]).format(defaultDateFormat))
                .to.startWith('2018-04-01 00:00:00');
            expect(moment(result[1]).format(defaultDateFormat))
                .to.startWith('2018-04-01 23:59:59');
        });

        it('should return two dates', () => {
            const start = moment('2018-04-01').toDate();
            const ds = new DateSplitter(start, start);
            const result = ds.split(2);

            expect(result.length).to.equal(2);
        });
    })

    describe('with three parts', () => {
        it('should return three date objects with time at start, middle and end of interval', () => {
            const start = moment('2018-04-01').toDate();
            const ds = new DateSplitter(start, start);
            const result = ds.split(3);

            expect(moment(result[0]).format(defaultDateFormat))
                .to.startWith('2018-04-01 00:00:00');
            expect(moment(result[1]).format(defaultDateFormat))
                .to.startWith('2018-04-01 11:59:59');
            expect(moment(result[2]).format(defaultDateFormat))
                .to.startWith('2018-04-01 23:59:59');
        });

        it('should return three dates', () => {
            const start = moment('2018-04-01').toDate();
            const ds = new DateSplitter(start, start);
            const result = ds.split(3);

            expect(result.length).to.equal(3);
        });
    });
});
