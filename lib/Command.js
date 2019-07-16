class Command {
    constructor(bot, db, commandName, info) {
        if (!info) throw new Error("I dunno what the heck is that command!") // ouo
        this.id = commandName
        this.usage = info.usage;
        this.category = info.category;
        this.description = info.description;
    }

    async exec(msg, args) {
        throw new Error("Please override this method.")
    }
}

module.exports = Command;