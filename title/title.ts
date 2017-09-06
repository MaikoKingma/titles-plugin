import { BasicTitle } from "../basic-title";

export class Title implements BasicTitle {

    constructor(public name: string, public minRange: number, public maxRange: number) {
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
        return new Title(literal.name, literal.minRange, literal.maxRange)
    }

    /**
     * Used by JSON.stringify. Returns a literal representation of this.
     */
    public toJSON(): BasicTitle {
        return {
            name: this.id, minRange: this.minRange, maxRange: this.maxRange;
        }
    }
}