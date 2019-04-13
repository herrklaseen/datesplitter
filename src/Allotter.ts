export class Allotter {
    static allot(slots: number, parts: number) {
        const partsPerSlotLimit: number = parts / slots;
        const partsInSlot: number[] = [];
        let partsRemainder = 0;
        let partCount = 0;

        for (let index = 0; index < slots; index++) {
            partsInSlot[index] = 0;
            partsRemainder += partsPerSlotLimit;
            while (partsInSlot[index] <= partsRemainder) {
                partsInSlot[index]++;
                partCount++;
                partsRemainder -= 1;
            }
        }

        return partsInSlot;
    }
}
