import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class unmutechat implements IBotCommand{

    private readonly _command = "unmutechat"

    help(): string {
        return "Dit command unmute een channel.";
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        
        //Command

        var mutechannel = msgObject.mentions.channels.first()

        var reason = args.slice(1).join(" ")

        let role = msgObject.guild.roles.find(r => r.name === "@everyone")

        if(!reason){
            reason = "Geen reden gegeven!"
        }

        if(!msgObject.member.hasPermission("BAN_MEMBERS"))
        {
            msgObject.channel.send(`Nope, geen permissions om de chat te unmuten ${msgObject.author.username}`);
            return;
        }

        mutechannel.overwritePermissions(role, {
                SEND_MESSAGES: true,
                SPEAK: true
            })
        
            mutechannel.send("De chat is weer geopend door " + msgObject.author.username)

            let embed = new Discord.RichEmbed()
            .setColor(255)
            .setAuthor(`${msgObject.guild.name} Modlogs`, msgObject.guild.iconURL)
            .addField("Moderation:", "Unmute chat")
            .addField("Channel", mutechannel)
            .addField("Moderator:", msgObject.author.username)
            .addField("Reden:",reason)
    
            let sChannel = msgObject.guild.channels.find(c => c.name === "🛠-modlogs") as Discord.TextChannel
            sChannel.send(embed)
    
            }
        }