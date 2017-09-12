import { ChatRegistry } from "./chat/chat-registry";
import { Title } from "./title/title";
import { Chat } from "../../src/chat/chat";

export class CommandManager {

    constructor(private readonly chatRegistry: ChatRegistry = new ChatRegistry) { }

    /**
     * Adds a title to the plugin.
     */
    public addTitle(message: string, chat: Chat): string {
                
        // Split string and ensure it contains at least 4 items.
        const split = message.split(" ");
        if (split.length < 4) {
            return "Not enough arguments! Format: /add_title [minRange] [maxRange] [name]";
        }
        
        // Identify and verify arguments.
        const minRange = Number(split[1]);
        const maxRange = Number(split[2]);
        const name = split.slice(3).join();

        if (isNaN(minRange)) {
            return "The minRange must be a number!";
        }
        if (isNaN(maxRange)) {
            return "The maxRange must be a number!";
        }

        //Add the new title to the given chat
        const chatObject =  this.chatRegistry.getOrCreateChat(chat);
        if (chatObject.addTitle(name, minRange, maxRange)) {
            return "Added the new title!";
        }

        return "Titles cannot overlap.";
    }


    /**
     * Modifys a title to the plugin.
     */
    public modifyTitle(message: string, chat: Chat): string {
        
        // Split string and ensure it contains at least 5 items.
        const split = message.split(" ");
        if (split.length < 5) {
            return "Not enough arguments! Format: /modify_title [id] [minRange] [maxRange] [name]";
        }
        
        // Identify and verify arguments.
        const id = Number(split[1]);
        const minRange = Number(split[2]);
        const maxRange = Number(split[3]);
        const name = split.slice(4).join();

        if (isNaN(minRange)) {
            return "The minRange must be a number!";
        }
        if (isNaN(maxRange)) {
            return "The maxRange must be a number!";
        }
        
        //Modify the title in the given chat
        const chatObject =  this.chatRegistry.getOrCreateChat(chat);
        const title = new Title(id, name, minRange, maxRange);
        if (chatObject.modifyTitle(title)) {
            return "Modified the title!";
        }

        return "Id did not match with an existing title or the new title would overlap with an existing title.";
    }

    /**
     * Returns all titles
     */
    public getTitles(chat: Chat): string {
        //Get titles
        const titles = this.chatRegistry.getOrCreateChat(chat).titles;
        
        //Create message with all titles
        let message = "<b>--- TITLES ---</b>\n\n";
        for (let title of titles) {
            message += title.toString() + "\n";
        }

        return message;
    }

    /**
     * Removes a title
     */
    public removeTitle(message: string, chat: Chat): string {
        
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
        
        //Remove title from the specified chat
        if (this.chatRegistry.getOrCreateChat(chat).removeTitle(id)) {
            return "Title removed!";
        }
        
        return "Id did not match with an existing title.";
    }

    /**
     * Overrides all titles of the given chat
     */
    public setTitles(message: string, chat: Chat): string {

        //Check foreach line if its correctly formated
        const lines = message.substr(12).split("\n");
        var success = true;
        for (let line of lines) {
            const split = line.split(" ");
            if (split.length < 3 || isNaN(Number(split[0])) || isNaN(Number(split[1]))) {
                success = false;
                break;
            }
        }
        if (!success) {
            return "Your message wasn't properly formated."
        }

        const chatObject = this.chatRegistry.getOrCreateChat(chat);
        //Remove all current titles
        chatObject.titles.length = 0;
        //Insert all new titles
        for (let line of lines) {
            const split = line.split(" ");
            chatObject.addTitle(split.slice(2).join(), Number(split[0]), Number(split[1]));
        }

        return "All titles have been added!";
    }
}