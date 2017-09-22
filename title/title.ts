import { BasicTitle } from "./basic-title";

export class Title implements BasicTitle {

    constructor(public id: number, public name: string, public maxRange: number, public line: number = null) {
        if (this.maxRange % 1 !== 0) {
            throw new RangeError("The maxRange should be a whole number!");
        }
    }
    
    /**
     * Returns a new Title parsed from a literal.
     */
    public static fromJSON(literal: BasicTitle):Title {
        return new Title(literal.id, literal.name, literal.maxRange);
    }

    /**
     * Used by JSON.stringify. Returns a literal representation of this.
     */
    public toJSON(): BasicTitle {
        return {
            id: this.id, name: this.name, maxRange: this.maxRange
        }
    }
    
    /**
     * Compares two titles using their maxRange.
     * Used for sorting collections.
     */
    public static compare(a: Title, b: Title) {
        if (a.maxRange < b.maxRange) {
            return 1;
        }
        else if (a.maxRange > b.maxRange) {
            return -1;
        }
        else {
            return 0;
        }
    }

    /**
     * Returns a string version of this title
     */
    public toString(): string {
        //Format depending on maxRange value
        var maxRangeString = this.maxRange + "    ";
        if (this.maxRange < 10 && this.maxRange > -10) {
            maxRangeString += "     ";
        }
        else if (this.maxRange < 100 && this.maxRange > -100) {
            maxRangeString += "   ";
        }
        else if (this.maxRange < 1000 && this.maxRange > -1000) {
            maxRangeString += "  ";
        }

        return this.id + "    " + maxRangeString + this.name;
    }
}