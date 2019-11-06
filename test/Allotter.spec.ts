import 'mocha';
import { use } from 'chai';
import { expect } from 'chai';
import chaiString = require('chai-string');
use(chaiString);


import { TestUtils as TU } from './TestUtils';
import { Allotter } from '../src/Allotter';

const defaultDateFormat = 'YYYY-MM-DD HH:mm:ss';

describe('Allotter errors', () => {
    describe('with non-integer parts input', () => {
        it('should throw an error', () => {
                expect(() => { Allotter.allot(1.2341, 1) }).to.throw();
        });
    });

    describe('with non-integer slots input', () => {
        it('should throw an error', () => {
                expect(() => { Allotter.allot(1, 1.2341) }).to.throw();
        });
    });
});

describe('Allotter allot()', () => {

    describe('with 1 slot and 1 part', () => {
        it('should return 1 slot with 1 part', () => {
            const partsPerSlot = Allotter.allot(1, 1);

            expect(partsPerSlot.length).to.eq(1);
            expect(partsPerSlot[0]).to.eq(1);
        });
    })

    describe('with 1 slot and 2 parts', () => {
        it('should return 1 slot with 2 parts', () => {
            const partsPerSlot = Allotter.allot(2, 1);

            expect(partsPerSlot.length).to.eq(1);
            expect(partsPerSlot[0]).to.eq(2);
        });
    })

    describe('with 2 slots and 2 parts', () => {
        it('should return 2 slots', () => {
            const partsPerSlot = Allotter.allot(2, 2);

            expect(partsPerSlot.length).to.eq(2);
        });
    })

    describe('with 2 slots and 2 parts', () => {
        it('should return 2 slots with 1 part each', () => {
            const partsPerSlot = Allotter.allot(2, 2);

            expect(partsPerSlot[0]).to.eq(1);
            expect(partsPerSlot[1]).to.eq(1);
        });
    })

    describe('with 2 slots and 3 parts', () => {
        it('should return 2 slots with 1 part in first slot and 2 parts in second', () => {
            const partsPerSlot = Allotter.allot(3, 2);

            expect(partsPerSlot[0]).to.eq(1);
            expect(partsPerSlot[1]).to.eq(2);
        });
    })

    describe('with 2 slots and 3 parts', () => {
        it('total number of parts should be 3', () => {
            const partsPerSlot = Allotter.allot(3, 2);
            const totalPartsAllotted = partsPerSlot.reduce((acc, current) => {
                return acc + current;
            });

            expect(totalPartsAllotted).to.eq(3);
        });
    })
});
