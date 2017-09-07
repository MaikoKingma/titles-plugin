export class CommandManager {

    /**
     * Adds a title to the plugin.
     */
    public addTitle(message: string, chatID: number): string {
        
        // Split string and ensure it contains at least 4 items.
        const split = message.split(" ");
        if (split.length < 4) {
            return "Not enough arguments! Format: /add_title [minRange] [maxRange] [name]";
        }
        
        // Identify and verify arguments.
        const minRange = Number(split[1]);
        const maxRange = Number(split[2]);
        const name = split.slice(3).join;

        if (isNaN(minRange)) {
            return "The minRange must be a number!";
        }
        if (isNaN(maxRange)) {
            return "The maxRange must be a number!";
        }

        //ToDo implement addTitle

        return "CommandNotImplementedException";
    }


    /**
     * Modifys a title to the plugin.
     */
    public modifyTitle(message: string, chatID: number): string {
        
        // Split string and ensure it contains at least 5 items.
        const split = message.split(" ");
        if (split.length < 5) {
            return "Not enough arguments! Format: /modify_title [id] [minRange] [maxRange] [name]";
        }
        
        // Identify and verify arguments.
        const id = Number(split[1]);
        const minRange = Number(split[2]);
        const maxRange = Number(split[3]);
        const name = split.slice(4).join;

        if (isNaN(minRange)) {
            return "The minRange must be a number!";
        }
        if (isNaN(maxRange)) {
            return "The maxRange must be a number!";
        }
        
        //ToDo implement modifyTitle

        return "CommandNotImplementedException";
    }

    /**
     * Returns all titles
     */
    public getTitles(chatID: number): string {
        
        //ToDo implement getTitles

        return "CommandNotImplementedException";
    }

    /**
     * Removes a title
     */
    public removeTitle(message: string, chatID: number): string {
        
        // Split string and ensure it contains at least 2 items.
        const split = message.split(" ");
        if (split.length < 2) {
            return "Not enough arguments! Format: /remove_title [id]";
        }

        // Identify and verify arguments.
        const id = Number(split[1]);
        if (isNaN(id)) {
            return "The id must be a number!";
        }

        //ToDo implement removeTitle
        //What to do with ranges without title?

        return "CommandNotImplementedException";
    }
}