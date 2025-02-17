async function tapAction() {
    if (!Telegram.WebApp.initDataUnsafe.user) {
        console.error("❌ Не вдалося отримати Telegram ID.");
        return;
    }

    const telegramId = Telegram.WebApp.initDataUnsafe.user.id;
    console.log(`📤 Відправляємо запит на сервер для користувача ${telegramId}...`);

    try {
        const response = await fetch('https://farm-ochre-one.vercel.app/api/update-coins', { // Вкажи свій сервер
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ telegramId, coins: 10 }),
        });

        const data = await response.json();
        console.log("📩 Отримано відповідь:", data);

        if (data.success) {
            document.getElementById("coinCount").textContent = data.newBalance;
            console.log('✅ Новий баланс монет:', data.newBalance);
        } else {
            console.error('❌ Не вдалося оновити монети:', data);
        }
    } catch (error) {
        console.error('❌ Помилка під час оновлення монет:', error);
    }
}
