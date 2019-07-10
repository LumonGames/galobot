import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class unban implements IBotCommand{

    private readonly _command = "unban"

    help(): string {
        return "Met dit command kun je mensen unbannen.";
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        
        //Command
        //Check permissions
        if(!msgObject.member.hasPermissions(["BAN_MEMBERS", "ADMINISTRATOR"]))
        {
            msgObject.channel.send(`Nope, geen permissions om te unbannen ${msgObject.author.username}`);
            return;
        }

        let bannedMember = await client.fetchUser(args[0])
            if(!bannedMember)
            {
                msgObject.channel.send("Geef een gebruiker om te unbannen!");
                return;
            }

            let reason = args.slice(1).join(" ")
            if(!reason) reason = "Geen reden gegeven."

            if(!msgObject.guild.me.hasPermissions(["BAN_MEMBERS", "ADMINISTRATOR"]))
            {
                msgObject.channel.send("Ik kon de gebruiker niet unbannen. (E: Geen permission)");
                return;
            }

            try {
                msgObject.guild.unban(bannedMember)
                msgObject.channel.send(`${bannedMember.tag} is geunbanned door ${msgObject.author.username}`)
            } catch(e) {
                console.log(e)
            }

            //Modlogs

        let embed = new Discord.RichEmbed()
        .setColor(255)
        .setAuthor(`${msgObject.guild.name} Modlogs`, msgObject.guild.iconURL)
        .addField("Moderation:", "Unban")
        .addField("Gebruiker:", bannedMember.username)
        .addField("Moderator:", msgObject.author.username)
        .addField("Reden:",reason)

        let sChannel = msgObject.guild.channels.find(c => c.name === "🛠-modlogs") as Discord.TextChannel
        sChannel.send(embed)

            
    }
}