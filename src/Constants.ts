/**
 * Collection of constants
 */
export default abstract class Constants {
    static readonly BASE_URL = "https://chatapi.viber.com/pa";
    static readonly MESSAGE_URL = "send_message";
    static readonly VIBER_API_KEY = "VIBER_API_KEY";
    static readonly HEADER_TOKEN_KEY = "X-Viber-Auth-Token";
    static readonly OSELYA_SENDER = "Оселя Лайф";
    // eslint-disable-next-line max-len
    static readonly OSELYA_WELCOME = "Вас вітає сервіс Оселя покликаний спростити комунікацію з Вашою обслуговуючою організацією. Тут Ви можете отримати актуальну інформацію по оплатах, заборгованості та нарахуваннях, а також створити заявку на виконання робіт. Для продовження роботи надайте свій номер телефону.";
    static readonly SHARE_PHONE_BTN = "Надати номер";
    static readonly PHONE_REQUEST = "PHONE_REQUEST";
    static readonly PROPERTY_REQUEST = "PROPERTY_REQUEST";
    static readonly PROPERTY_SELECT = "PROPERTY_SELECT";
    static readonly BALANCE_INFO = "BALANCE_INFO";
    static readonly CREATE_CLAIM = "CREATE_CLAIM";
    // eslint-disable-next-line max-len
    static readonly CLAIM_CREATED = "Вашу заявку успішно збережено!\nДякуємо за звернення.";
    static readonly CLAIM_INVITE = "Опишіть проблему";
}
