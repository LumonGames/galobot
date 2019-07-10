import * as Discord from "discord.js";
import { IBotCommand } from "../api";

const superagent = require('superagent');


export default class dog implements IBotCommand{

    private readonly _command = "dog"

    help(): string {
        return "Geeft een random foto van een hond.";
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        
        //Start

        let msg = await msgObject.channel.send("Foto zoeken...")

        let {body} = await superagent
        .get('https://dog.ceo/api/breeds/image/random')

        if(!{body}) {
            msgObject.channel.send("Whoops, probeer het opnieuw.")
            return;
        }

        let cEmbed = new Discord.RichEmbed()
        .setColor("RED")
        .setAuthor('Dog!', msgObject.guild.iconURL)
        .setImage(body.message)
        .setTimestamp()
        .setDescription(`Een hond voor ${msgObject.author.username}`)

        msgObject.channel.send({embed: cEmbed})
        
    }
}