import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class prune implements IBotCommand {

    private readonly _command = "prune"

    help(): string {
        return "Prune berichten in de chat";
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        //Command
        msgObject.delete();

        //Admin check
        if (!msgObject.member.hasPermission("ADMINISTRATOR")) {
            msgObject.channel.send(`Sorry ${msgObject.author.username}, dit command is alleen voor Admins.`)
                .then(msg => {
                    (msg as Discord.Message).delete(5000);
                });
            return;
        }

        //Args check
        if(!args[0]){
            msgObject.channel.send(`Sorry ${msgObject.author.username}, je moet een getal geven.`)
            .then(msg => {
                (msg as Discord.Message).delete(5000);
            });
        return;
        }

        let numberOfMessagesToDelete = Number(args[0]);

        if(numberOfMessagesToDelete == NaN)
        {
            msgObject.channel.send(`Sorry ${msgObject.author.username}, dat is geen geldig nummer.`)
            .then(msg => {
                (msg as Discord.Message).delete(5000);
            });
            return;
        }

        numberOfMessagesToDelete = Math.round(numberOfMessagesToDelete + 1);

        //Delete de berichten
        msgObject.channel.bulkDelete(numberOfMessagesToDelete)
            .catch(console.error);
    }
}