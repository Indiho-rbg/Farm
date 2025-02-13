const { Telegraf } = require('telegraf');

const bot = new Telegraf('7578633286:AAESGkDK5YdSLqlobv0ut1W3ozVRKJtghNE');

bot.start((ctx) => {
    console.log("Отримано /start від", ctx.from.username); // Лог для перевірки
    ctx.reply('Привіт! Натисни кнопку, щоб грати:', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Грати', web_app: { url: 'https://vercel.com/indihos-projects/farm' } }]
            ]
        }
    });
});

bot.launch();
console.log("Бот запущено...");
