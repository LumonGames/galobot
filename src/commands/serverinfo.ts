import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class serverinfo implements IBotCommand{

    private readonly _command = "serverinfo"

    help(): string {
        return "Dit command geeft je informatie over de server.";
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        
        //Command
        let embed = new Discord.RichEmbed()
                        .setColor([0, 255 , 0])
                        .setTitle("Server Info")
                        .setFooter("Problemen met de bot? Message @Vqzi#0079")
                        .setThumbnail(msgObject.guild.iconURL)
                        .setDescription(`Server Informatie - ${msgObject.guild.name}`)
                        .addField("Aantal leden:", `${msgObject.guild.memberCount}`)
                        .addField("Server owner:", `${msgObject.guild.owner}`)
                        .addField("Server Emoji's", `${msgObject.guild.emojis}`)
                        .addField("Aantal server waar ik inzit:", client.guilds.size)

        msgObject.channel.send(embed)
            .catch(console.error);
    }
}