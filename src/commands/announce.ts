import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class announce implements IBotCommand {

    private readonly _command = "announce"

    help(): string {
        return "Met dit command kun je announcements versturen.";
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        //Command

        if (!msgObject.member.hasPermission("ADMINISTRATOR")) {
            msgObject.channel.send(`Nope, geen permissions om een mededeling te versturen ${msgObject.author.username}`);
            return;
        }

        let argsresult;
        let mChannel = msgObject.mentions.channels.first()
        if (mChannel) {
            argsresult = args.slice(1).join(" ")
            mChannel.send(argsresult)
            msgObject.channel.send("Bericht verzonden!")
        } else {
            argsresult = args.join(" ")
            msgObject.channel.send(argsresult)
        }
    }
}