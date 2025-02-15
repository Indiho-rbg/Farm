const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
    console.log("Отримано команду /start від:", ctx.from.id);
    ctx.reply("Привіт! Це тестовий бот.");
});

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        console.log("Отримано новий запит:", req.body);
        await bot.handleUpdate(req.body);
        return res.status(200).send('OK');
    }

    console.log("Отримано некоректний запит:", req.method);
    res.status(405).send('Method Not Allowed');
};
