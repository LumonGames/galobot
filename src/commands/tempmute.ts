import * as Discord from "discord.js";
import { IBotCommand } from "../api";

const ms = require("ms");

export default class tempmute implements IBotCommand {

    private readonly _command = "tempmute"

    help(): string {
        return "Met dit command kun je iemand tempmuten";
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        //Check permissions
        if (!msgObject.member.hasPermission("KICK_MEMBERS")) {
            msgObject.channel.send(`Nope, geen permissions om te muten ${msgObject.author.username}`);
            return;
        }

        if (!msgObject.guild.me.hasPermissions(["MANAGE_ROLES", "ADMINISTRATOR"])) {
            msgObject.channel.send("Ik kon de gebruiker niet muten (E: Geen permission)");
            return;
        }

        var user = msgObject.guild.member(msgObject.mentions.users.first() || msgObject.guild.members.get(args[0]));

        if (!user) {
            msgObject.channel.send("Geef een geldige gebruiker. (!!tempmute <gebruiker> <reden> <tijd>)");
            return;
        }

        if (user.hasPermission("MANAGE_MESSAGES")) {
            msgObject.channel.send("Ik kon deze gebruiker niet muten.");
            return;
        }

        var muteRole = msgObject.guild.roles.find("name", "GaloMuted")
        if(!muteRole) {
            try{
                muteRole = await msgObject.guild.createRole({
                    name: "GaloMuted",
                    color: "#514f48",
                    permissions: []
                })
                msgObject.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muteRole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SEND_TTS_MESSAGES: false,
                        ATTACH_FILES: false,
                        SPEAK: false,
                    })
                })

            } catch(e) {
                console.log(e.stack)
            }
        }

        var muteTime = args[2];
        var reason = args[1];

        if(!muteTime) {
            msgObject.channel.send("Geef een geldige tijd. (!!tempmute <gebruiker> <reden> <tijd>)");
            return;
        }

        if(!reason) {
            msgObject.channel.send("Geef een geldige reden. (!!tempmute <gebruiker> <reden> <tijd>)");
            return;
        }

        await (user.addRole(muteRole.id));

        msgObject.channel.send(`${user} is gemute voor ${muteTime}`);

        setTimeout(function() {

            user.removeRole(muteRole.id);

        }, ms(muteTime));

        //Modlogs

        let embed = new Discord.RichEmbed()
        .setColor(255)
        .setAuthor(`${msgObject.guild.name} Modlogs`, msgObject.guild.iconURL)
        .addField("Moderation:", "Mute")
        .addField("Gebruiker:", `<@${user.user.id}>`)
        .addField("Moderator:", `<@${msgObject.author.id}>`)
        .addField("Tijd:", muteTime)
        .addField("Reden:",reason)

        let sChannel = msgObject.guild.channels.find(c => c.name === "🛠-modlogs") as Discord.TextChannel
        sChannel.send(embed)

        
    }
}