import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class testCommand implements IBotCommand{

    private readonly _command = "testcommand"

    help(): string {
        return "Dit command doet helemaal niks! :upside_down:";
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        
        //Bericht
        msgObject.channel.send("Cool!");
        console.log("Test command worked")
    }
}