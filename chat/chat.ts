import { BasicChat } from "./basic-chat";
import { Title } from "../title/title";

export class Chat implements BasicChat {

    constructor(public id: number, public titles: Title[]) {
        
    }
    
    /**
     * Returns a new Chat parsed from a literal.
     */
    public static fromJSON(literal: BasicChat):Chat {
        return new Chat(literal.id, literal.titles);
    }

    /**
     * Used by JSON.stringify. Returns a literal representation of this.
     */
    public toJSON(): BasicChat {
        return {
            id: this.id, titles: this.titles
        }
    }
}