const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
    ctx.reply(
        "Привіт! Обери дію:",
        Markup.inlineKeyboard([
            [Markup.button.webApp("🎮 Запустити гру", "https://farm-ochre-one.vercel.app/")],
            [Markup.button.callback("ℹ Про гру", "about")],
            [Markup.button.callback("❓ Допомога", "help")]
        ])
    );
});

// Обробка кнопки "Про гру"
bot.action("about", (ctx) => {
    ctx.answerCbQuery(); // Закриває "чекаюче" повідомлення
    ctx.reply("Це веб-гра, де ти можеш створювати свою ферму та заробляти віртуальні монети! 🌾💰");
});

// Обробка кнопки "Допомога"
bot.action("help", (ctx) => {
    ctx.answerCbQuery();
    ctx.reply("Натисни \"Запустити гру\", щоб почати. Використовуй кнопки для керування фермою! 🏡");
});

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        await bot.handleUpdate(req.body);
        return res.status(200).send('OK');
    }

    res.status(405).send('Method Not Allowed');
};
