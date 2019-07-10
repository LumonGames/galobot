import * as Discord from "discord.js";
import { IBotCommand } from "../api";
import mute from "./mute";

export default class mutechat implements IBotCommand{

    private readonly _command = "mutechat"

    help(): string {
        return "Dit command mute een channel.";
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        
        //Command

        var reason = args.slice(1).join(" ")
        
        var mutechannel = msgObject.mentions.channels.first()

        let role = msgObject.guild.roles.find(r => r.name === "@everyone")

        if(!reason){
            reason = "Geen reden gegeven!"
        }

        if(!msgObject.member.hasPermission("BAN_MEMBERS"))
        {
            msgObject.channel.send(`Nope, geen permissions om de chat te muten ${msgObject.author.username}`);
            return;
        }

        if(mutechannel){
        mutechannel.overwritePermissions(role, {
                SEND_MESSAGES: false,
                SPEAK: false
            })
        
        mutechannel.send("De chat is gesloten door " + msgObject.author.username)
        }

        let embed = new Discord.RichEmbed()
        .setColor(255)
        .setAuthor(`${msgObject.guild.name} Modlogs`, msgObject.guild.iconURL)
        .addField("Moderation:", "Mute chat")
        .addField("Channel", mutechannel)
        .addField("Moderator:", msgObject.author.username)
        .addField("Reden:",reason)

        let sChannel = msgObject.guild.channels.find(c => c.name === "🛠-modlogs") as Discord.TextChannel
        sChannel.send(embed)

        }
    }