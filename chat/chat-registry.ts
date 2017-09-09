import { Chat } from "./chat";
import { Title } from "../title/title";

/**
 * Keeps track of all the chats.
 */
export class ChatRegistry {

    /**
     * Creates a new chat registry with a list of chats.
     */
    constructor(private readonly chats = new Map<number, Chat>()) { }

    /**
     * Creates or returns the chat corresponding with the ID
     */
    public getOrCreateChat(id: number): Chat {
        //if the chats exists return it
        if (this.chats.has(id)) {
            return this.chats.get(id) as Chat;
        }

        //else create a new chat with predefined titles
        let titles: Title[] = [
            new Title(0, "Pepe's", 2500, 9999),
            new Title(1, "Memers", 2000, 2499),
            new Title(2, "Wholesome", 1000, 1999),
            new Title(3, "Normies", 0, 999),
            new Title(4, "Thijs'", -9999, -1)
        ];
        const chat = new Chat(id, titles);
    }
}