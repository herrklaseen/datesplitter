import math = require('mathjs');

export class Allotter {
    /**
     * Distribute a number of parts into slots. Useful for
     * distributing a number of "things" into a distinct number
     * of "buckets". For instance allotting three parts into two
     * slots will return an array like [ 1, 2 ], and seven parts
     * into four slots will return [ 1, 2, 2, 2 ].
     *
     * @param   parts           The total number of parts expected as output,
     *                          non-zero integer.
     * @param   slots           The slots into which to distribute the parts,
     *                          non-zero integer.
     * @returns                 Array where each position holds the number
     *                          of parts in that slot. The sum of the values
     *                          in the array is equal to the parts in the
     *                          input.
     */
    static allot(parts: number, slots: number) {
        if (! (Allotter.validateInput(slots) && Allotter.validateInput(parts))) {
            throw new Error('Input invalid, should be positive, non-zero integer');
        }

        const partsPerSlotLimit: any = math.fraction(parts, slots);

        const partsInSlot: number[] = [];
        let partsRemainder: any = math.fraction(0, slots);

        // loop over all slots
        for (let index = 0; index < slots; index++) {
            partsInSlot[index] = 0;

            // keep track of the parts that did not
            // 'fit' in the slot as a remainder
            partsRemainder = math.add(partsRemainder, partsPerSlotLimit);

            // if the remainder is larger than one,
            // put a part in the slot
            while (math.largerEq(partsRemainder, 1)) {
                partsInSlot[index]++;

                // since we put a part in the slot,
                // remove the part (1) from the remainder
                partsRemainder = math.subtract(partsRemainder, 1);
            }
        }

        return partsInSlot;
    }

    static validateInput(input: number) {
        if (! Number.isInteger(input)) {
            return false;
        }

        if (input < 1 ) {
            return false;
        }

        return true;
    }
}
