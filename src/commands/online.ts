import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class online implements IBotCommand{

    private readonly _command = "online"

    help(): string {
        return "Zet de botstatus naar online";
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        
        //Command
        client.user.setStatus("online")
        client.user.setActivity("Galodox' Mandje", { type: "WATCHING" });
        msgObject.channel.send("Done! (Status: Online)")
    }
}