import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class lebber implements IBotCommand{

    private readonly _command = "lebber"

    help(): string {
        return "Met dit command kun je een lebber geven.";
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        
        //Command
        var name = args[0]
        msgObject.channel.send(name + " is afgelebberd door " + msgObject.author.username)
    }
}