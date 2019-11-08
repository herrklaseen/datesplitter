import 'mocha';
import { use } from 'chai';
import { expect } from 'chai';
import chaiString = require('chai-string');
use(chaiString);

import { Allotter } from '../src/Allotter';

const defaultDateFormat = 'YYYY-MM-DD HH:mm:ss';

describe('Allotter errors', () => {
    describe('with decimal parts input', () => {
        it('should throw an error', () => {
                expect(() => { Allotter.allot(1.2341, 1) }).to.throw();
        });
    });

    describe('with decimal slots input', () => {
        it('should throw an error', () => {
                expect(() => { Allotter.allot(1, 1.2341) }).to.throw();
        });
    });

    describe('with zero as parts input', () => {
        it('should throw an error', () => {
                expect(() => { Allotter.allot(0, 1) }).to.throw();
        });
    });

    describe('with zero as slots input', () => {
        it('should throw an error', () => {
                expect(() => { Allotter.allot(1, 0) }).to.throw();
        });
    });

    describe('with less than one as parts input', () => {
        it('should throw an error', () => {
            expect(() => { Allotter.allot(-0.4, 1) }).to.throw();
        });
    });

    describe('with less than one as slots input', () => {
        it('should throw an error', () => {
            expect(() => { Allotter.allot(4, -4.565) }).to.throw();
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

    describe('with 3 slots and 9 parts', () => {
        it('should return 3 slots with 3 parts each', () => {
            const partsPerSlot = Allotter.allot(9, 3);

            expect(partsPerSlot[0]).to.eq(3);
            expect(partsPerSlot[1]).to.eq(3);
            expect(partsPerSlot[2]).to.eq(3);
        });
    })

    describe('with 3 slots and 9 parts', () => {
        it('total number of parts should be 9', () => {
            const partsPerSlot = Allotter.allot(9, 3);

            const totalPartsAllotted = partsPerSlot.reduce((acc, current) => {
                return acc + current;
            });

            expect(totalPartsAllotted).to.eq(9);
        });
    })

    describe('with 3 slots and 61 parts', () => {
        it('total number of parts should be 61', () => {
            const partsPerSlot = Allotter.allot(61, 3);

            const totalPartsAllotted = partsPerSlot.reduce((acc, current) => {
                return acc + current;
            });

            expect(totalPartsAllotted).to.eq(61);
        });
    })

});
