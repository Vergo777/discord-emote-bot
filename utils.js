import { emoteMap } from './constants';

// returns user command(s) from message as an array, with each element of array being separate space-separated word in the command
export function getUserCommandFromMessage(botInvokeCommand, messageString) {
    let userCommandString = messageString.replace(botInvokeCommand, ''); 
    return userCommandString.trim().split(" +"); 
}

export function sendEmoteToServer(user, channelID, emoteName) {
    console.log("Emote name is " + emoteName);
    if(emoteMap.hasOwnProperty(emoteName)) {
        return {
            to: channelID,
            file: './emotes/' + emoteMap[emoteName],
            message: user + ' : '
        }
    }

    return {}
}