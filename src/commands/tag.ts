import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class tag implements IBotCommand {

    private readonly _command = "tag"

    help(): string {
        return "Met dit command kun je een tag voor de Tag Rank versturen.";
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        //Command

        let TAGRole = msgObject.guild.roles.find("name", "🐾Tag Rank")
        if (msgObject.member.hasPermission("ADMINISTRATOR")) {
            // allowed access to command
            let tChannel = msgObject.mentions.channels.first()
            if (tChannel) {
                TAGRole.edit({
                    "mentionable": true,
                  },
                )
                tChannel.send(`<@&${TAGRole.id}> `)
                msgObject.channel.send("Tag verzonden!").then
                
                
                await TAGRole.edit({
                    "mentionable": false,
                  },
                )
        } else {
            // not allowed access
            msgObject.channel.send(`Ik kon geen tag versturen. (E: Je hebt geen permission, of geen channel gegeven.)`);
            return;
        }

        }
    }
}