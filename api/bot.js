const { Telegraf, Markup } = require("telegraf");
const express = require("express");
const mongoose = require("mongoose");

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();
app.use(express.json());

// Підключення до MongoDB без застарілих параметрів
mongoose.connect('mongodb+srv://<myUser>:<Holo12345>@cluster0.cv5e5.mongodb.net/farmgame?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.log('MongoDB connection error:', err);
  });

// 📌 Модель користувача
const User = mongoose.model("User", new mongoose.Schema({
    telegramId: { type: String, required: true, unique: true },
    coins: { type: Number, default: 0 }
}));

// 📌 Обробка команди /start
bot.start(async (ctx) => {
    let user = await User.findOne({ telegramId: ctx.from.id });

    if (!user) {
        user = new User({ telegramId: ctx.from.id });
        await user.save();
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

// 📌 API-ендпоінт для оновлення балансу гравця з гри
app.post("/api/update-coins", async (req, res) => {
    const { telegramId, coins } = req.body;

    const user = await User.findOneAndUpdate(
        { telegramId },
        { $inc: { coins } },
        { new: true }
    );

    if (!user) return res.status(404).send("Користувача не знайдено.");

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
