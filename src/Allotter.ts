import math = require('mathjs');


export class Allotter {
    static allot(slots: number, parts: number) {
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
}
