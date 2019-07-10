import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class unmute implements IBotCommand{

    private readonly _command = "unmute"

    help(): string {
        return "Met dit command kun je mensen unmuten.";
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        
        //Check permissions
        if(!msgObject.member.hasPermission("BAN_MEMBERS"))
        {
            msgObject.channel.send(`Nope, geen permissions om te unmuten ${msgObject.author.username}`);
            return;
        }

        if(!msgObject.guild.me.hasPermissions(["MANAGE_ROLES", "ADMINISTRATOR"]))
        {
            msgObject.channel.send("Ik kon de gebruiker niet unmuten (E: Geen permission)");
            return;
        }

        //Geef een reden en mention een serverlid
        let muteMember = msgObject.mentions.members.first() || msgObject.guild.members.get(args[0]);
        if(!muteMember)
        {
            msgObject.channel.send("Je moet een serverlid taggen om te muten!");
            return;
        }

        let reason = args.slice(1).join(" ");
        if(!reason)
        {
            reason = "Geen reden gegeven!"
        }

        //Check voor mute role
        let muterole = msgObject.guild.roles.find(r => r.name === "GaloMuted")
        if(!muterole)
        {
            msgObject.channel.send("Er is geen mute role om te removen.");
            return;
        }

        //Remove de mute role
        muteMember.removeRole(muterole.id).then(() => {
            msgObject.delete()
            muteMember.send(`Hallo, je bent geunmute in ${msgObject.guild.name}`).catch(err => console.log(err))
            msgObject.channel.send(`${muteMember.user.username} is geunmute door ${msgObject.author.username}.`)
        })

        //Modlogs

        let embed = new Discord.RichEmbed()
        .setColor(255)
        .setAuthor(`${msgObject.guild.name} Modlogs`, msgObject.guild.iconURL)
        .addField("Moderation:", "Unmute")
        .addField("Gebruiker:", muteMember.user.username)
        .addField("Moderator:", msgObject.author.username)
        .addField("Reden:",reason)

        let sChannel = msgObject.guild.channels.find(c => c.name === "🛠-modlogs") as Discord.TextChannel
        sChannel.send(embed)
    }
}