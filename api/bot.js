const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.launch({
  polling: true,
});
 // Запускаємо бота

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        await bot.handleUpdate(req.body);
    }
    res.status(200).send('OK');
};
