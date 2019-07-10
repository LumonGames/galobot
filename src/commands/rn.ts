import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class rn implements IBotCommand{

    private readonly _command = "rn"

    help(): string {
        return "Dit command geeft een random nummer.";
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        
        //Nummer
        msgObject.channel.send(Math.floor(Math.random() * 1000))
    }
}