const { Telegraf } = require('telegraf');

const bot = new Telegraf('YOUR_BOT_TOKEN');

bot.start((ctx) => {
    console.log("Отримано /start від", ctx.from.username); // Лог для перевірки
    ctx.reply('Привіт! Натисни кнопку, щоб грати:', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Грати', web_app: { url: 'https://your-vercel-game.vercel.app' } }]
            ]
        }
    });
});

bot.launch();
console.log("Бот запущено...");
