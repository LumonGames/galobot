import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class nood implements IBotCommand{

    private readonly _command = "nood"

    help(): string {
        return "Dit command zet nood modus aan of uit.";
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        
        //Nood

        if(args[0] === "aan"){

            var reason = args.slice(1).join(" ")
        
            var nederlands = msgObject.guild.channels.find(channel => channel.name === "nederlands") as Discord.TextChannel
            var staffHelp = msgObject.guild.channels.find(channel => channel.name === "staff-help") as Discord.TextChannel
            var media = msgObject.guild.channels.find(channel => channel.name === "media") as Discord.TextChannel
            var suggesties = msgObject.guild.channels.find(channel => channel.name === "suggesties") as Discord.TextChannel
            var suggestieLogs = msgObject.guild.channels.find(channel => channel.name === "suggestie-logs") as Discord.TextChannel
            var randomnaam = msgObject.guild.channels.find(channel => channel.name === "randomnaam-suggesties") as Discord.TextChannel
            var botCommands = msgObject.guild.channels.find(channel => channel.name === "bot-commands") as Discord.TextChannel
            var wyr = msgObject.guild.channels.find(channel => channel.name === "would-you-rather") as Discord.TextChannel
            var deTel = msgObject.guild.channels.find(channel => channel.name === "de-tel-naar∞") as Discord.TextChannel
            var hetVerhaal = msgObject.guild.channels.find(channel => channel.name === "het-verhaal") as Discord.TextChannel
            var pokecord = msgObject.guild.channels.find(channel => channel.name === "pokecord") as Discord.TextChannel
            var fanArt = msgObject.guild.channels.find(channel => channel.name === "fan-art") as Discord.TextChannel
            var mededelingen = msgObject.guild.channels.find(channel => channel.name === "🔔-mededelingen") as Discord.TextChannel
    
            let role = msgObject.guild.roles.find(r => r.name === "@everyone")
    
            if(!reason){
                reason = "Geen reden gegeven!"
            }
    
            if(!msgObject.member.hasPermission("BAN_MEMBERS"))
            {
                msgObject.channel.send(`Nope, geen permissions om noodmodus in te schakelen ${msgObject.author.username}`);
                return;
            }
    
            //#nederlands
            nederlands.overwritePermissions(role, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false,
                SPEAK: false
            })

            //#staff-help
            staffHelp.overwritePermissions(role, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false,
                SPEAK: false
            })

            //#media
            media.overwritePermissions(role, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false,
                SPEAK: false
            })

            //#suggesties
            suggesties.overwritePermissions(role, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false,
                SPEAK: false
            })

            //#suggestie-logs
            suggestieLogs.overwritePermissions(role, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false,
                SPEAK: false
            })

            //#randomnaam-suggesties
            randomnaam.overwritePermissions(role, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false,
                SPEAK: false
            })

            //#bot-commands
            botCommands.overwritePermissions(role, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false,
                SPEAK: false
            })

            //#would-you-rather
            wyr.overwritePermissions(role, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false,
                SPEAK: false
            })

            //#de-tel-naar∞
            deTel.overwritePermissions(role, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false,
                SPEAK: false
            })

            //#het-verhaal
            hetVerhaal.overwritePermissions(role, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false,
                SPEAK: false
            })

            //#pokecord
            pokecord.overwritePermissions(role, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false,
                SPEAK: false
            })

            //#fan-art
            fanArt.overwritePermissions(role, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false,
                SPEAK: false
            })

            mededelingen.send("**Door wat problemen in de server zijn alle channels tijdelijk dicht.**")
            msgObject.channel.send("Noodmodus: **aan**")
            
            }
    
            if(args[0] === "uit"){

                var reason = args.slice(1).join(" ")
            
                var nederlands = msgObject.guild.channels.find(channel => channel.name === "nederlands") as Discord.TextChannel
                var staffHelp = msgObject.guild.channels.find(channel => channel.name === "staff-help") as Discord.TextChannel
                var media = msgObject.guild.channels.find(channel => channel.name === "media") as Discord.TextChannel
                var suggesties = msgObject.guild.channels.find(channel => channel.name === "suggesties") as Discord.TextChannel
                var suggestieLogs = msgObject.guild.channels.find(channel => channel.name === "suggestie-logs") as Discord.TextChannel
                var media = msgObject.guild.channels.find(channel => channel.name === "media") as Discord.TextChannel
                var randomnaam = msgObject.guild.channels.find(channel => channel.name === "randomnaam-suggesties") as Discord.TextChannel
                var botCommands = msgObject.guild.channels.find(channel => channel.name === "bot-commands") as Discord.TextChannel
                var wyr = msgObject.guild.channels.find(channel => channel.name === "would-you-rather") as Discord.TextChannel
                var deTel = msgObject.guild.channels.find(channel => channel.name === "de-tel-naar∞") as Discord.TextChannel
                var hetVerhaal = msgObject.guild.channels.find(channel => channel.name === "het-verhaal") as Discord.TextChannel
                var pokecord = msgObject.guild.channels.find(channel => channel.name === "pokecord") as Discord.TextChannel
                var fanArt = msgObject.guild.channels.find(channel => channel.name === "fan-art") as Discord.TextChannel
                var mededelingen = msgObject.guild.channels.find(channel => channel.name === "🔔-mededelingen") as Discord.TextChannel
        
                let role = msgObject.guild.roles.find(r => r.name === "@everyone")
        
                if(!reason){
                    reason = "Geen reden gegeven!"
                }
        
                if(!msgObject.member.hasPermission("BAN_MEMBERS"))
                {
                    msgObject.channel.send(`Nope, geen permissions om noodmodus uit te schakelen ${msgObject.author.username}`);
                    return;
                }
        
                //#nederlands
                nederlands.overwritePermissions(role, {
                    SEND_MESSAGES: true,
                    READ_MESSAGES: true,
                    SPEAK: true
                })
    
                //#staff-help
                staffHelp.overwritePermissions(role, {
                    SEND_MESSAGES: true,
                    READ_MESSAGES: true,
                    SPEAK: true
                })
    
                //#media
                media.overwritePermissions(role, {
                    SEND_MESSAGES: true,
                    READ_MESSAGES: true,
                    SPEAK: true
                })

                //#suggesties
                suggesties.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true,
                SPEAK: true
                 })

                //#suggestie-logs
                suggestieLogs.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true,
                SPEAK: true
                 })
    
                //#randomnaam-suggesties
                randomnaam.overwritePermissions(role, {
                    SEND_MESSAGES: true,
                    READ_MESSAGES: true,
                    SPEAK: true
                })
    
                //#bot-commands
                botCommands.overwritePermissions(role, {
                    SEND_MESSAGES: true,
                    READ_MESSAGES: true,
                    SPEAK: true
                })
    
                //#would-you-rather
                wyr.overwritePermissions(role, {
                    SEND_MESSAGES: true,
                    READ_MESSAGES: true,
                    SPEAK: true
                })
    
                //#de-tel-naar∞
                deTel.overwritePermissions(role, {
                    SEND_MESSAGES: true,
                    READ_MESSAGES: true,
                    SPEAK: true
                })
    
                //#het-verhaal
                hetVerhaal.overwritePermissions(role, {
                    SEND_MESSAGES: true,
                    READ_MESSAGES: true,
                    SPEAK: true
                })
    
                //#pokecord
                pokecord.overwritePermissions(role, {
                    SEND_MESSAGES: true,
                    READ_MESSAGES: true,
                    SPEAK: true
                })
    
                //#fan-art
                fanArt.overwritePermissions(role, {
                    SEND_MESSAGES: true,
                    READ_MESSAGES: true,
                    SPEAK: true
                    
                })
                
                mededelingen.send("**De channels zijn weer open!**")
                msgObject.channel.send("Noodmodus: **uit**")
                
            }
            
    }
}