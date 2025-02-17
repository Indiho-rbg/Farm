async function tapAction() {
  const telegramId = Telegram.WebApp.initDataUnsafe.user.id; // Отримуємо Telegram ID

  try {
    const response = await fetch('/api/update-coins', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ telegramId, coins: 10 }),
    });

    const data = await response.json();
    if (data.success) {
      coins += 10; // Додаємо 10 монет
      document.getElementById("coinCount").textContent = coins;
      console.log('Новий баланс монет:', data.newBalance);
    } else {
      console.log('Не вдалося оновити монети');
    }
  } catch (error) {
    console.error('Помилка під час оновлення монет:', error);
  }
}
