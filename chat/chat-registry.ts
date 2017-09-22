import { ChatObject } from "./chatObject";
import { Title } from "../title/title";
import { Chat } from "../../../src/chat/chat";

/**
 * Keeps track of all the chats.
 */
export class ChatRegistry {

    /**
     * Creates a new chat registry with a list of chats.
     */
    constructor(private readonly chats = new Map<number, ChatObject>()) { }

    /**
     * Creates or returns the chat corresponding with the ID
     */
    public getOrCreateChat(chat: Chat): ChatObject {
        //if the chats exists return it
        if (this.chats.has(chat.id)) {
            this.chats.get(chat.id).chat = chat;
            return this.chats.get(chat.id) as ChatObject;
        }

        //else create a new chat with predefined titles
        let titles: Title[] = [
            new Title(0, "Thijs'", 0),
            new Title(1, "Normies", 999),
            new Title(2, "Wholesome", 1999),
            new Title(3, "Memers", 2499),
            new Title(4, "Pepe's", 9999)
        ];
        const chatObject = new ChatObject(chat, titles);
        this.chats.set(chat.id, chatObject);
        return chatObject;
    }
}