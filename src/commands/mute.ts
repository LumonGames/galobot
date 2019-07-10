import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class mute implements IBotCommand{

    private readonly _command = "mute"

    help(): string {
        return "Met dit command kun je mensen muten.";
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        
        //Check permissions
        if(!msgObject.member.hasPermission("BAN_MEMBERS"))
        {
            msgObject.channel.send(`Nope, geen permissions om te muten ${msgObject.author.username}`);
            return;
        }

        if(!msgObject.guild.me.hasPermissions(["MANAGE_ROLES", "ADMINISTRATOR"]))
        {
            msgObject.channel.send("Ik kon de gebruiker niet muten (E: Geen permission)");
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

        //Mute role
        let muterole = msgObject.guild.roles.find(r => r.name === "GaloMuted")
        if(!muterole) {
            try{
                muterole = await msgObject.guild.createRole({
                    name: "GaloMuted",
                    color: "#514f48",
                    permissions: []
                })
                msgObject.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SEND_TTS_MESSAGES: false,
                        ATTACH_FILES: false,
                        SPEAK: false
                    })
                })

            } catch(e) {
                console.log(e.stack)
            }
        }

        //Add mute role

        muteMember.addRole(muterole.id).then(() => {
            msgObject.delete()
            muteMember.send(`Hallo, je bent gemute in ${msgObject.guild.name} voor: ${reason}`)
            msgObject.channel.send(`${muteMember.user.username} is gemute.`)
        })

        //Modlogs

        let embed = new Discord.RichEmbed()
        .setColor(255)
        .setAuthor(`${msgObject.guild.name} Modlogs`, msgObject.guild.iconURL)
        .addField("Moderation:", "Mute")
        .addField("Gebruiker:", muteMember.user.username)
        .addField("Moderator:", msgObject.author.username)
        .addField("Reden:",reason)

        let sChannel = msgObject.guild.channels.find(c => c.name === "🛠-modlogs") as Discord.TextChannel
        sChannel.send(embed)
        
        
    }
}