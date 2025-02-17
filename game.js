async function tapAction(telegramId) {
    try {
        // Збільшуємо монети, наприклад, на 10
        const response = await fetch('/api/update-coins', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ telegramId, coins: 10 }),
        });

        const data = await response.json();
        if (data.success) {
            console.log('Новий баланс монет:', data.newBalance);
            // Оновити UI або відобразити новий баланс на екрані
            document.getElementById('coin-balance').innerText = data.newBalance;
        } else {
            console.log('Не вдалося оновити монети');
        }
    } catch (error) {
        console.error('Помилка під час оновлення монет:', error);
    }
}
