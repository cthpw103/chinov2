const Command = require("../lib/Command");
const { CommandCategories }  = require("../lib/Constants");
class PingCommand extends Command {
    constructor(...args) {
        super(...args, {
            usage: "None",
            category: CommandCategories.GENERAL,
            description: "A testing commando"
        });
    }
async run(msg, args) {
    try {
        var evaluated = eval(args);
        console.log(evaluated);
        msg.channel.createMessage({
            "embed": {
                "title": `:white_check_mark: Successfully evaluated!`,
                "description": `Output:\n${evaluated}`
            }
        })
    } catch (err) {
        console.log("An error occurred while using eval:" + err.message);
        msg.channel.createMessage(":x:**Error:**:x:\n**```xl\n" + err.message + "\n```**");
        msg.channel.createMessage({
            "embed": {
                "title": `:x: Unexpected item in bagging area!`,
                "description": err.message
            }
        })
    }
}
}

module.exports = PingCommand;
