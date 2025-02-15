const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
    ctx.reply(
        "Привіт! Натисни кнопку, щоб почати гру:",
        Markup.inlineKeyboard([
            Markup.button.webApp("🎮 Запустити гру", "https://farm-ochre-one.vercel.app/")
        ])
    );
});

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        await bot.handleUpdate(req.body);
        return res.status(200).send('OK');
    }

    res.status(405).send('Method Not Allowed');
};
