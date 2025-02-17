const { Telegraf, Markup } = require("telegraf");
const express = require("express");
const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;
const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();
app.use(express.json());

// Підключення до MongoDB без застарілих параметрів
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// 📌 Модель користувача
const User = mongoose.model("User", new mongoose.Schema({
    telegramId: { type: String, required: true, unique: true },
    coins: { type: Number, default: 0 }
}));

// 📌 Обробка команди /start
bot.start(async (ctx) => {
    console.log("Команда /start від", ctx.from.id); 

    let user = await User.findOne({ telegramId: ctx.from.id.toString() });

    console.log("Знайдено користувача:", user);

    if (!user) {
        user = new User({ telegramId: ctx.from.id.toString(), coins: 100 }); // Додамо стартові монети
        await user.save();
        console.log("Новий користувач створений:", user);
    }

    ctx.reply(
        `Привіт, ${ctx.from.first_name}! У тебе ${user.coins} монет.`,
        Markup.inlineKeyboard([
            [Markup.button.webApp("🎮 Запустити гру", "https://farm-ochre-one.vercel.app/")],
            [Markup.button.callback("ℹ Про гру", "about")],
            [Markup.button.callback("❓ Допомога", "help")]
        ])
    );
});

// 📌 Обробка кнопки "Про гру"
bot.action("about", (ctx) => {
    ctx.answerCbQuery(); // Закриває "чекаюче" повідомлення
    ctx.reply("Це веб-гра, де ти можеш створювати свою ферму та заробляти віртуальні монети! 🌾💰");
});

// 📌 Обробка кнопки "Допомога"
bot.action("help", (ctx) => {
    ctx.answerCbQuery();
    ctx.reply("Натисни \"Запустити гру\", щоб почати. Використовуй кнопки для керування фермою! 🏡");
});

// 📌 API-ендпоінт для отримання балансу гравця
app.get("/api/get-coins/:telegramId", async (req, res) => {
    const { telegramId } = req.params;

    console.log(`Запит на отримання монет для користувача ${telegramId}`);

    const user = await User.findOne({ telegramId: telegramId.toString() });

    if (!user) {
        console.log(`Користувача з ID ${telegramId} не знайдено.`);
        return res.status(404).send("Користувача не знайдено.");
    }

    console.log(`Баланс користувача ${telegramId}: ${user.coins}`);
    res.send({ success: true, coins: user.coins });
});

// 📌 API-ендпоінт для оновлення балансу гравця з гри
app.post("/api/update-coins", async (req, res) => {
    const { telegramId, coins } = req.body;

    // Перевірка типу даних
    if (typeof coins !== 'number') {
        console.log(`Помилка: coins має бути числом. Відправлено: ${typeof coins}`);
        return res.status(400).send("coins має бути числом.");
    }

    console.log(`Запит на оновлення монет для користувача ${telegramId}. Додавання монет: ${coins}`);

    const user = await User.findOneAndUpdate(
        { telegramId: telegramId.toString() },
        { $inc: { coins } },
        { new: true }
    );

    if (!user) {
        console.log("Користувач не знайдений!");
        return res.status(404).send("Користувача не знайдено.");
    }

    console.log(`Новий баланс для користувача ${telegramId}: ${user.coins}`);
    res.send({ success: true, newBalance: user.coins });
});

// 📌 Вебхук для Telegram
app.post(`/api/bot`, async (req, res) => {
    await bot.handleUpdate(req.body);
    res.sendStatus(200);
});

// 📌 Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Сервер працює на порту ${PORT}`);
});
