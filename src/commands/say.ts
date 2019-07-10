import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class say implements IBotCommand {

    private readonly _command = "say"

    help(): string {
        return "Dit command is om berichten naar channels of gebruikers te sturen.";
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        //Command
        let mentionedUser = msgObject.mentions.users.first();
        let channel = msgObject.mentions.channels.first();
        let message = args.slice(2).join(" ");
        let type = args[0]
        let userID = "561613647596748819"

        if(msgObject.member.hasPermission("ADMINISTRATOR")) {
            if (type === "dm") {
                mentionedUser.sendMessage(message)
                msgObject.author.sendMessage(`(${message}) is verzonden naar ${mentionedUser}`)
                msgObject.channel.send(`(${message}) is verzonden naar ${channel}`)
                return;
            }
            if (type === "channel") {
                channel.send(message)
                msgObject.author.send(`(${message}) is verzonden naar ${channel}`)
                msgObject.channel.send(`(${message}) is verzonden naar ${channel}`)
                return;
            }
        } else {
            msgObject.author.sendMessage("Je moet Admin of hoger zijn om dit command te gebruiken.")
            msgObject.channel.send("Je moet Admin of hoger zijn om dit command te gebruiken.")
        }


    }
}