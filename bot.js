var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');// Configure logger settings

import { BOT_INVOKE_COMMAND } from './constants';
import { getUserCommandFromMessage, sendEmoteToServer } from './utils';

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';


// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
 });

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    if(message.startsWith(BOT_INVOKE_COMMAND)) {
        logger.info("Bot invoked");
        let userCommandArray = getUserCommandFromMessage(BOT_INVOKE_COMMAND, message);

        if(userCommandArray[0] === "help") {
            bot.sendMessage({
                to: channelID,
                message: "Usage : e![emoteName], e.g, e!bakaKaren. Emote list at https://github.com/Vergo777/discord-emote-bot/tree/master/emotes"
            })
        } else {
            bot.uploadFile(sendEmoteToServer(user, channelID, userCommandArray[0]), function(error, response) {
                if(error) {
                    logger.info("Could not find requested emote"); 
                }

                console.log(evt.d.id);
                bot.deleteMessage({
                    channelID: channelID,
                    messageID: evt.d.id
                })
            });
        }
    }
});