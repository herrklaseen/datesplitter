import 'mocha';
import { use } from 'chai';
import { expect } from 'chai';
import chaiString = require('chai-string');
use(chaiString);

import moment = require('moment');

import { TestUtils as TU } from './TestUtils';
import { DateUtil } from '../src/DateUtil';

const defaultDateFormat = 'YYYY-MM-DD HH:mm:ss';

describe('DateUtil daysInInterval()', () => {

    describe('with same start as end', () => {
        it('should return zero full days', () => {
            const start = moment('2018-04-01').toDate();

            const fullDays = DateUtil.daysInInterval(start, start);

            expect(fullDays).to.eq(0);
        });
    })

    describe('with end one day after start', () => {
        it('should return one full day', () => {
            const start = moment('2018-04-01').toDate();
            const end = moment('2018-04-02').toDate();

            const fullDays = DateUtil.daysInInterval(start, end);

            expect(fullDays).to.eq(1);
        });
    })

    describe('with end one and a half day after start', () => {
        it('should return one full day', () => {
            const start = moment('2018-04-01').toDate();
            const end = moment('2018-04-02 12:00:00').toDate();

            const fullDays = DateUtil.daysInInterval(start, end);

            expect(fullDays).to.eq(1);
        });
    })

    describe('with end three days and four hours after start', () => {
        it('should return three full days', () => {
            const start = moment('2018-04-01').toDate();
            const end = moment('2018-04-04 04:00:00').toDate();

            const fullDays = DateUtil.daysInInterval(start, end);

            expect(fullDays).to.eq(3);
        });
    })

    describe('with end one day before start', () => {
        it('should return minus one full day', () => {
            const start = moment('2018-04-02').toDate();
            const end = moment('2018-04-01').toDate();

            const fullDays = DateUtil.daysInInterval(start, end);

            expect(fullDays).to.eq(-1);
        });
    })

});
