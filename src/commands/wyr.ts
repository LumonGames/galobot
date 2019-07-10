import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class wyr implements IBotCommand {

    private readonly _command = "wyr"

    help(): string {
        return "Met dit command kun je de Would You Rather berichten versturen.";
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        //Command

        let allowedRole = msgObject.guild.roles.find("name", "🐾WYR");
        let WYRRole = msgObject.guild.roles.find("name", "🐾Would You Rather")
        if (msgObject.member.roles.has(allowedRole.id)) {
            // allowed access to command
            let argsresult2;
            let wChannel = msgObject.guild.channels.find(channel => channel.name === "would-you-rather") as Discord.TextChannel
            if (wChannel) {
                argsresult2 = args.slice(0).join(" ")
                WYRRole.edit({
                    "mentionable": true,
                  },
                )
                wChannel.send(`<@&${WYRRole.id}> ` + argsresult2)
                msgObject.channel.send("Bericht verzonden!").then
                
                
                await WYRRole.edit({
                    "mentionable": false,
                  },
                )
        } else {
            // not allowed access
            msgObject.channel.send(`Nope, geen permissions om een WYR bericht te versturen.`);
            return;
        }

        }
    }
}