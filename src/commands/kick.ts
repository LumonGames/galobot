import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class kick implements IBotCommand{

    private readonly _command = "kick"

    help(): string {
        return "Kick de genoemde gebruiker";
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        
        //Command
        let mentionedUser = msgObject.mentions.users.first();
        let suppliedReason = args.slice(1).join(" ") || "";
        let kickLog = `${suppliedReason}`;

        if(!msgObject.member.hasPermission("KICK_MEMBERS"))
        {
            msgObject.channel.send(`Nope, geen permissions om te kicken ${msgObject.author.username}`);
            return;
        }

        if(!mentionedUser)
        {
            msgObject.channel.send(`Sorry ${msgObject.author.username}, ik kon deze gebruiker niet vinden!`);
            return;
        }

        msgObject.guild.member(mentionedUser).kick(kickLog)
            .then(console.log)
            .catch(console.error)

        msgObject.channel.send(`${mentionedUser} is gekicked door ${msgObject.author.username} voor: ${kickLog}`)

        //Modlogs

        let embed = new Discord.RichEmbed()
        .setColor(255)
        .setAuthor(`${msgObject.guild.name} Modlogs`, msgObject.guild.iconURL)
        .addField("Moderation:", "Kick")
        .addField("Gebruiker:", mentionedUser.username)
        .addField("Moderator:", msgObject.author.username)
        .addField("Reden:",kickLog)

        let sChannel = msgObject.guild.channels.find(c => c.name === "🛠-modlogs") as Discord.TextChannel
        sChannel.send(embed)
    }
}