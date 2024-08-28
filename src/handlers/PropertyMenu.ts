import RequestHandler from "../RequestHandler";
import {AxiosResponse} from "axios";
import MessageHelper from "../MessageHelper";
import Constants from "../Constants";

/**
 * Main menu request
 */
export default class PropertyMenu extends RequestHandler {
    /**
     *
     * @param {string} body
     */
    constructor(body: string) {
        super(body); // must call super()
    }

    /**
     * condition
     *
     * @return {boolean}
     */
    condition(): boolean {
        return this.body.message?.tracking_data ===
            Constants.PROPERTY_REQUEST ||
            this.body.message?.text === Constants.PROPERTY_REQUEST;
    }

    /**
     * handler
     */
    async handle(): Promise<AxiosResponse> {
        const propertyMenuMessage: Message = {
            receiver: this.body.sender.id,
            min_api_version: 7,
            keyboard: {
                Type: "keyboard",
                InputFieldState: "hidden",
                DefaultHeight: false,
                Buttons: [
                    {
                        ActionType: "open-url",
                        // eslint-disable-next-line max-len
                        ActionBody: "https://oselya.life/payment.html",
                        Columns: 4,
                        Rows: 1,
                        // eslint-disable-next-line max-len
                        Text: "<font color='#FFFFFF' size=22>Оплатити 1 386 грн.</font>",
                        BgColor: "#F0923F",
                        TextSize: "large",
                        TextHAlign: "center",
                        TextVAlign: "middle",
                        Silent: true,
                    },
                    {
                        ActionType: "reply",
                        ActionBody: Constants.CREATE_CLAIM,
                        Columns: 2,
                        Rows: 1,
                        // eslint-disable-next-line max-len
                        Text: "<font color='#FFFFFF' size=18>Створити заявку</font>",
                        BgColor: "#F0923F",
                        TextSize: "large",
                        TextHAlign: "center",
                        TextVAlign: "middle",
                        Silent: true,
                    },
                    {
                        ActionType: "reply",
                        ActionBody: Constants.BALANCE_INFO,
                        Columns: 3,
                        Rows: 1,
                        // eslint-disable-next-line max-len
                        Text: "<font color='#FFFFFF' size=18>Нарахування та платежі</font>",
                        BgColor: "#F0923F",
                        TextSize: "large",
                        TextHAlign: "center",
                        TextVAlign: "middle",
                        Silent: true,
                    },
                    {
                        ActionType: "reply",
                        ActionBody: Constants.PROPERTY_SELECT,
                        Columns: 3,
                        Rows: 1,
                        // eslint-disable-next-line max-len
                        Text: "<font color='#FFFFFF' size=18>Назад</font>",
                        BgColor: "#F0923F",
                        TextSize: "large",
                        TextHAlign: "center",
                        TextVAlign: "middle",
                        Silent: true,
                    },
                ],
            },
        };
        const helper = new MessageHelper(propertyMenuMessage);
        return await helper.send();
    }
}
