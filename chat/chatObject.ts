import { Title } from "../title/title";
import { Chat } from "../../../src/chat/chat";
import { User } from "../../../src/user/user";

export class ChatObject {

    constructor(public chat: Chat, public readonly titles: Title[]) {
        const testTitles = [
            new Title(0, "Pepe's", 2500, 9999),
            new Title(1, "Memers", 2000, 2499),
            new Title(2, "Wholesome", 1000, 1999),
            new Title(3, "Normies", 0, 999)
        ];
        const testUsers = [
            new User(0, "User1", 3710),
            new User(1, "User2", 2946),
            new User(2, "User3", 2678),
            new User(3, "User4", 2211),
            new User(4, "User5", 2206),
            new User(5, "User6", 1654),
            new User(6, "User7", 1280),
            new User(7, "User8", 630),
            new User(8, "User9", 575)
        ];
        this.calculateLeaderboard(testTitles, testUsers);
    }
    
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
    public removeTitle(titleId: number): boolean {
        var index = this.titles.findIndex(oldTitle => oldTitle.id == titleId);
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
     * Calculates on which lines of the leaderboard tiles should be writen.
     */
    private calculateLeaderboard(testTitles: Title[], testUsers: User[]) {
        const linesBeforeFirstLeaderboardEntry = 2;
        for (let title of testTitles/*this.Titles*/) {
            for (let user of testUsers /*this.chat.sortedUsers()*/) {
                if (user.score < title.maxRange) {
                    title.line = testUsers.findIndex(u => u == user) + linesBeforeFirstLeaderboardEntry + testTitles.findIndex(t => t == title);
                    break;
                }
            }
        }

        //For testing purposes
        //lines should be inserted in this.chat.generateLeaderboard();
        let position = 1;
        let lines: Array<string> = [ "--- LEADERBOARD ---\n", ""];
        for(let user of testUsers) {
            lines.push(position + " " + user.name + " " + user.score);
            position++;
        }

        for(let title of testTitles) {
            lines.splice(title.line, 0, title.name + " " + title.maxRange + " " + title.minRange);
        }
        
        var leaderboard = "";
        for(let line of lines) {
            leaderboard += "\n" + line;
        }
        console.log(leaderboard);
    }
    
    /**
     * Returns a new Chat parsed from a literal.
     */
    // public static fromJSON(literal: BasicChat):ChatObject {
    //     return new ChatObject(literal.id, literal.titles);
    // }

    /**
     * Used by JSON.stringify. Returns a literal representation of this.
     */
    // public toJSON(): BasicChat {
    //     return {
    //         id: this.id, titles: this.titles
    //     }
    // }
}