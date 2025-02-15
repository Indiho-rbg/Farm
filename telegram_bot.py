from telegram import InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo, Update
from telegram.ext import Updater, CommandHandler, CallbackQueryHandler, CallbackContext

TOKEN = "7578633286:AAESGkDK5YdSLqlobv0ut1W3ozVRKJtghNE"

def start(update: Update, context: CallbackContext) -> None:
    keyboard = [
        [InlineKeyboardButton("Натисни мене", web_app=WebAppInfo('https://farm-ochre-one.vercel.app/'))]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)

    update.message.reply_text("Привіт! Натисни кнопку:", reply_markup=reply_markup)

def main():
    updater = Updater(TOKEN, use_context=True)
    dp = updater.dispatcher

    dp.add_handler(CommandHandler("start", start))

    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()
