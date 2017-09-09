import { BasicChat } from "./basic-chat";
import { Title } from "../title/title";

export class Chat implements BasicChat {

    constructor(public id: number, public readonly titles: Title[]) { }
    
    /**
     * Adds a new title to this chat if it doesn't conflict with other title ranges.
     */
    public addTitle(name: string, minRange: number, maxRange: number): boolean {
        const title = new Title(this.getNextTitleId(), name, minRange, maxRange);
        if (!this.checkOverlap(title)) {
            return false;
        }
        this.titles.push(title);
        this.titles.sort(Title.compare);
        return true;
    }

    /**
     * Modifies an existing title in this chat if it doesn't conflict with other title ranges.
     */
    public modifyTitle(title: Title): boolean {
        var index = this.titles.findIndex(oldTitle => oldTitle.id == title.id);
        
        if (index == -1 || !this.checkOverlap(title)) {
            return false;
        }

        //Set the old title with new values
        this.titles[index].minRange = title.minRange;
        this.titles[index].maxRange = title.maxRange;
        this.titles[index].name = title.name;
        this.titles.sort(Title.compare);
        return true;
    }

    /**
     * Removes an title from this chat.
     */
    public removeTitle(id: number): boolean {
        var index = this.titles.findIndex(oldTitle => oldTitle.id == id);
        if (index == -1) {
            return false;
        }

        //Remove the title from the array
        this.titles.splice(index, 1);

        return true;
    }

    /**
     * Finds the next id for titles;
     */
    private getNextTitleId(): number {
        var maxId = 0;
        this.titles.map(function(title) {
            if (title.id > maxId) {
                maxId = title.id;
            }
        });
        
        return maxId + 1;
    }

    /**
     * Checks if the newTitle overlaps with any exising titles in the chat.
     */
    private checkOverlap(newTitle: Title): boolean {
        for (let title of this.titles) {
            if (title.id == newTitle.id) {
                continue;
            }
            if (newTitle.minRange <= title.maxRange && title.minRange <= newTitle.maxRange) {
                return false;
            }
        }
        return true;
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