import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class ramon implements IBotCommand{

    private readonly _command = "ramon"

    help(): string {
        return "Dit command is voor Ramon.";
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        
        //Ramon

        if(args[0] === "1"){
        var naam = args[3]
        if(naam){
            msgObject.channel.send(`Hi ${naam}`);
            return;
        }}

        if(args[0] === "2"){
            var text = "Hi\nHi2\nHi3";
            msgObject.channel.send(text);

        }
        
        let wChannel = msgObject.guild.channels.find(channel => channel.name === "bot-status") as Discord.TextChannel
        
        if(msgObject.channel === wChannel)

        msgObject.channel.send("Hi")
    }
}