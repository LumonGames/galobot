import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class dnd implements IBotCommand{

    private readonly _command = "dnd"

    help(): string {
        return "Zet de botstatus naar DND";
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        
        //Command
        client.user.setStatus("dnd")
        client.user.setActivity("Vqzi", { type: "LISTENING" });
        msgObject.channel.send("Done! (Status: DND)")
    }
}