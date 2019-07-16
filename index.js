const Eris = require("eris");
const Client = require("./lib/customClient");
const {
    token,
    prefix
} = require("./config.json");
Object.defineProperty(Eris.Message.prototype, "guild", {
    get: function() {
        return this.channel.guild;
    }
})

const bot = new Client(token, {});

bot.on("ready", async () => {
    await bot.loadCommands();
    console.log(`${bot.user.username}, ready for service. ${bot.commands.size} commands loaded.`);
})

bot.on("messageCreate", async msg => {
    if (msg.channel instanceof Eris.PrivateChannel) return;
    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return;
    const [cmdName, ...args] = msg.content.slice(prefix.length).split(" ");
    if (!bot.commands.has(cmdName.toLowerCase())) return;
    const command = bot.commands.get(cmdName.toLowerCase());
    if (!bot.canRunCommand(command, msg.member)) return;
    try {
        await command.run(msg, args);
    } catch(e) {
        console.error(e);
    }
})

bot.connect();
