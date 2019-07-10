import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class setstatus implements IBotCommand {

    private readonly _command = "setstatus"

    help(): string {
        return "Dit command verandert de status van de bot.";
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        //Command

        var type = args[0]

        var status = args.slice(1).join(" ")

        let logchannel = msgObject.guild.channels.find(channel => channel.name === "bot-status-log") as Discord.TextChannel

        let embed = new Discord.RichEmbed()
            .setColor(255)
            .setAuthor(`${msgObject.guild.name} StatusLog`, msgObject.guild.iconURL)
            .addField("Type:", type)
            .addField("Tekst:", status)
            .addField("Gebruiker:", `<@${msgObject.author.id}>`)
        

        if (msgObject.author.id === '561613647596748819' || '275657895323107338') {

        if(status === "watching" || "playing" || "listening"){
            if (type === "watching") {
                client.user.setActivity(`${status}`, { type: "WATCHING" })
                logchannel.send(embed)
                msgObject.channel.send(`Nieuwe status: ${status}. Status type: ${type}`)
            }

            if (type === "playing") {
                client.user.setActivity(`${status}`, { type: "PLAYING" })
                logchannel.send(embed)
                msgObject.channel.send(`Nieuwe status: ${status}. Status type: ${type}`)
            }

            if (type === "listening") {
                client.user.setActivity(`${status}`, { type: "LISTENING" })
                logchannel.send(embed)
                msgObject.channel.send(`Nieuwe status: ${status}. Status type: ${type}`)
            }
        }

        } else {
            msgObject.author.sendMessage("Je moet <@561613647596748819> of <@275657895323107338> zijn om dit command te gebruiken.")
            msgObject.channel.send("Je moet <@561613647596748819> of <@275657895323107338> zijn om dit command te gebruiken.")
        }

    }
}
