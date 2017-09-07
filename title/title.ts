import { BasicTitle } from "./basic-title";

export class Title implements BasicTitle {

    constructor(public id: number, public name: string, public minRange: number, public maxRange: number) {
        if (this.minRange % 1 !== 0) {
            throw new RangeError("The minRange should be a whole number!");
        }
        if (this.maxRange % 1 !== 0) {
            throw new RangeError("The maxRange should be a whole number!");
        }
    }
    
    /**
     * Returns a new Title parsed from a literal.
     */
    public static fromJSON(literal: BasicTitle):Title {
        return new Title(literal.id, literal.name, literal.minRange, literal.maxRange);
    }

    /**
     * Used by JSON.stringify. Returns a literal representation of this.
     */
    public toJSON(): BasicTitle {
        return {
            id: this.id, name: this.name, minRange: this.minRange, maxRange: this.maxRange
        }
    }
    
    /**
     * Compares two titles using their minRange and maxRange.
     * Used for sorting collections.
     */
    public static compare(a: Title, b: Title) {
        if (a.minRange < b.minRange) {
            return -1;
        }
        else if (a.minRange > b.minRange) {
            return 1;
        }
        else if (a.maxRange < b.maxRange) {
            return -1;
        }
        else if (a.maxRange > b.maxRange) {
            return -1;
        }
    }
}