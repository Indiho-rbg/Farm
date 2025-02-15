const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        await bot.handleUpdate(req.body);
        return res.status(200).send('OK');
    }

    // Якщо запит не POST – повертаємо 405 (Method Not Allowed)
    res.status(405).send('Method Not Allowed');
};
