const fetch = require('node-fetch');

const botToken = '7578633286:AAESGkDK5YdSLqlobv0ut1W3ozVRKJtghNE'; // Ваш токен
const userChatId = 'USER_CHAT_ID'; // Ідентифікатор користувача (отримати через команду /start)

const message = {
  chat_id: userChatId,
  text: 'Грати в гру',
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: 'Запустити гру',
          web_app: { url: 'https://your-game-url.com' }
        }
      ]
    ]
  }
};

fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(message)
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
