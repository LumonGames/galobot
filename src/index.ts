console.log("Index.ts loaded successfully");

import * as Discord from "discord.js";
import * as ConfigFile from "./config";
import { IBotCommand } from "./api";

const client: Discord.Client = new Discord.Client();

let commands: IBotCommand[] = [];

loadCommands(`${__dirname}/commands`);

client.on("ready", () => {

    //Bot online event
    console.log("Bot is ready!");
    client.user.setActivity("Galodox' Mandje", { type: "WATCHING" });

})

//Message Logs

//Message edit event

client.on("messageUpdate", async (oldMessage, newMessage) => {

    if (oldMessage.content === newMessage.content) {
        return;
    }

    let logchannel = oldMessage.guild.channels.find(channel => channel.name === "logs") as Discord.TextChannel

    let logembed = new Discord.RichEmbed()
        .setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL)
        .setThumbnail(oldMessage.author.avatarURL)
        .setColor("RED")
        .setDescription("**Message Edited**")
        .addField("Before", oldMessage.content, true)
        .addField("After", newMessage.content, true)
        .setTimestamp()
        .addField("Channel", oldMessage.channel)

    logchannel.send(logembed)
})

//Message delete event
client.on("messageDelete", async message => {
    let logchannel = message.guild.channels.find(channel => channel.name === "logs") as Discord.TextChannel

    let logembed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setThumbnail(message.author.avatarURL)
        .setColor("RED")
        .setDescription("**Message Deleted**")
        .addField("Message", message.content, true)
        .setTimestamp()
        .addField("Channel", message.channel)

    logchannel.send(logembed)

})

client.on("guildMemberAdd", member => {

    const rando_imgs = [
        'https://cdn.discordapp.com/attachments/561618708934426627/597844825190039570/Welkom1.png',
        'https://cdn.discordapp.com/attachments/561618708934426627/597844825567526932/Welkom2.png',
        'https://cdn.discordapp.com/attachments/561618708934426627/597844824451973121/Welkom3.png',
        'https://cdn.discordapp.com/attachments/561618708934426627/597844824405835843/Welkom4.png',
        'https://cdn.discordapp.com/attachments/561618708934426627/597845196864094213/Welkom5.png',
        'https://cdn.discordapp.com/attachments/561618708934426627/597845191466024960/Welkom6.png',
        'https://cdn.discordapp.com/attachments/561618708934426627/597845195043635200/Welkom7.png',
        'https://cdn.discordapp.com/attachments/561618708934426627/597844814242775040/Welkom8.png',
        'https://cdn.discordapp.com/attachments/561618708934426627/597844815258058782/Welkom9.png',
        'https://cdn.discordapp.com/attachments/561618708934426627/597844816843374605/Welkom10.png',
        'https://cdn.discordapp.com/attachments/561618708934426627/597844818160386049/Welkom11.png',
        'https://cdn.discordapp.com/attachments/561618708934426627/597844820706328598/Welkom12.png',
        'https://cdn.discordapp.com/attachments/561618708934426627/597844823952588818/Welkom13.png',
    ]

    let welcomechannel = member.guild.channels.find(channel => channel.name === "👋-welkom") as Discord.TextChannel

    let embed2 = new Discord.RichEmbed()
        .setColor(255)
        .addField(`Welkom in ${member.guild.name}`, `Voel je thuis, maar hou het netjes <@${member.user.id}>`)
        .setImage(rando_imgs[Math.floor(Math.random() * rando_imgs.length)])

    welcomechannel.send(embed2)

    let memberRole = member.guild.roles.find(role => role.id == "558262032927948803");
    member.addRole(memberRole);

    member.send(`Welkom in de ${member.guild.name} Discord server! Lees de regels goed door, en heb veel plezier!`)
})

client.on("message", msg => {

    //Negeer berichten van de bot zelf
    if (msg.author.bot) { return; }

    //Negeer berichten zonder de prefix
    if (!msg.content.startsWith(ConfigFile.config.prefix)) { return; }

    //Negeer DM berichten
    if (msg.channel.type == "dm") { return; }

    //Handle command
    handleCommand(msg);

})

async function handleCommand(msg: Discord.Message) {

    //Split string
    let command = msg.content.split(" ")[0].replace(ConfigFile.config.prefix, "").toLowerCase();
    let args = msg.content.split(" ").slice(1);

    for (const commandClass of commands) {

        //Poging om het command te proberen
        try {

            //Check de command class
            if (!commandClass.isThisCommand(command)) {
                continue;
            }

            //Pauze
            await commandClass.runCommand(args, msg, client);
        }
        catch (exception) {

            //Log error
            console.log(exception);
        }
    }
}


function loadCommands(commandsPath: string) {

    //Stop als er geen commands zijn
    if (!ConfigFile.config || (ConfigFile.config.commands as string[]).length === 0) { return; }

    //Alle commands inladen
    for (const commandName of ConfigFile.config.commands as string[]) {

        const commandsClass = require(`${commandsPath}/${commandName}`).default;

        const command = new commandsClass() as IBotCommand;

        commands.push(command);
    }
}


//Gewone berichten zonder prefix

var version = '1.0.1'
var playingserver = "Galodox' Mandje"
var invitelink = ' https://discord.gg/2bzmnXV'
var youtubelink = 'https://www.youtube.com/channel/UCzDkWeADVgv95LHY-EfizbA'
var tagreaction = 'Hoii'
var myPrefix = '!!'

client.on('message', message => {

    //Negeer DM berichten
    if (message.channel.type == "dm") { return; }

    let command2 = message.content.split(" ")[0].toLowerCase();
    let args = message.content.split(" ");


    if (message.author.bot) { return; }

    if (command2 === "yt") {
        message.channel.sendMessage(`Dit is mijn YouTube kanaal: ${youtubelink}`);
        return;
    }

    if (command2 === "inv") {
        message.channel.sendMessage(`Hier is een invite link voor de server: ${invitelink}`);
        return;
    }

    if (command2 === "youtube") {
        message.channel.sendMessage(`Dit is mijn YouTube kanaal: ${youtubelink}`);
        return;
    }

    if (command2 === "invite") {
        message.channel.sendMessage(`Hier is een invite link voor de server: ${invitelink}`);
        return;
    }

    if (command2 === "<@596681265655185438>") {
        message.channel.sendMessage(tagreaction + ` <@${message.author.id}>. ` + `Mijn prefix is **${myPrefix}**.`);
        return;
    }

    //De Snelle Muizen
    if (message.content === "Hii") {
        message.channel.sendMessage('Hi');
        return;
    }

    if (message.content === "Ik kan nu") {
        message.channel.sendMessage('Oke nice, ik bijna');
        return;
    }

    if (message.content === "Hoelaat?") {
        message.channel.sendMessage('Over ca. 10 min');
        return;
    }

    if (message.content === "Oke, tot zo") {
        message.channel.sendMessage('Ja, tot zo');
        return;
    }

    if (message.content === "Wie ben je?") {
        message.channel.sendMessage(':mouse: Dat weet alleen <@561613647596748819> :mouse2:');
        return;
    }

    if (message.content === "Muis") {
        message.channel.sendMessage('Test123');
        return;
    }

    var naam = args[3]
    if (message.content === `Hallo ik ben ${args[3]}`)

        if (naam) {
            message.channel.send(`Hi ${naam}`);
            return;
        }

    let wChannel = message.guild.channels.find(channel => channel.name === "bot-status")
    if (message.content === "JOOO")
        if (message.channel === wChannel)

            message.channel.send("Hi")

})


//DM logs


client.on('message', async message => {
    var owner = client.users.get('561613647596748819') as Discord.User
    var owner2 = client.users.get('275657895323107338') as Discord.User

    if (message.channel.type === 'dm') {
        if (message.author.bot) { return; }

        if (!message.author.bot) {
            owner.send(`<@${message.author.id}> stuurt dit naar mij in PM: ` + message.content)
            owner2.send(`<@${message.author.id}> stuurt dit naar mij in PM: ` + message.content)
            return;
        }
    }
});


client.login(ConfigFile.config.token);