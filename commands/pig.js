const Command = require("../lib/Command");
const { CommandCategories }  = require("../lib/Constants");
class PingCommand extends Command {
    constructor(...args) {
        super(...args, {
            usage: "None",
            category: CommandCategories.GENERAL,
            description: "vry pig"
        });
    }

async run(msg, args) {
var message = await msg.channel.createMessage(`pig png th aniem`); //define the message we sent so we can edit it
var timestamp = message.timestamp // the time the msg was sent ouo
message.edit(`pog are ${new Date() - timestamp} have took`) // calculate ping on the time msg was sent and the current time
}
}

module.exports = PingCommand;
