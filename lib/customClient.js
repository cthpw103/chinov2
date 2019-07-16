const { Client, Collection } = require("eris");
const { CommandCategories, StaffRole, OwnerID } = require("./Constants");
const Command = require("./Command");
const { readdir } = require("fs");
const { promisify } = require("util"); // Node v10 when :(

// Super duper WIP client, dont integrate til further notice -tttie
class NetskyBotClient extends Client {
    constructor(...args) {
        super(...args);
        this.commands = new Collection(Command);
    }

    canRunCommand(command, member) {
        if (command.category === CommandCategories.GENERAL || command.category === CommandCategories.FUN || command.category === CommandCategories.MISC) return true;
        if (command.category === CommandCategories.MODERATION) return member.roles.includes(StaffRole);
        if (command.category === CommandCategories.OWNER) return OwnerID.includes(member.id);
    }

    async loadCommands() {
        const files = await promisify(readdir)(`./commands`);
        files
            .filter(file => /.+\.js$/.test(file))
            .forEach(async file => {
                let command;
                try {
                    command = require(`${process.cwd()}/commands/${file}`);
                } catch(_) {
                    return;
                }
                if (!(command.prototype instanceof Command)) return;
                this.commands.add(new command(this, null /*db placeholder*/, file.match(/(.+)\.js$/)[1].toLowerCase()));
            })
    }
}

module.exports = NetskyBotClient