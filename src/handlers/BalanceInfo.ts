import RequestHandler from "../RequestHandler";
import {AxiosResponse} from "axios";
import MessageHelper from "../MessageHelper";
import Constants from "../Constants";

/**
 * Show payments information
 */
export default class BalanceInfo extends RequestHandler {
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
        return this.body.message?.text === Constants.BALANCE_INFO;
    }

    /**
     * handler
     */
    async handle(): Promise<AxiosResponse> {
        let info = "\n*Історія нарахувань*:\n";
        info += "07.24 - 290.18\n";
        info += "06.24 - 290.18\n";
        info += "05.24 - 290.18\n";
        info += "04.24 - 290.18\n";
        info += "03.24 - 290.18\n";
        info += "02.24 - 290.18\n";
        info += "\n*Історія платежів*:\n";
        info += "05.08.24 - 1000.00\n";
        info += "03.07.24 - 1200.00\n";

        const welcomeMessage: Message = {
            receiver: this.body.sender.id,
            min_api_version: 7,
            type: "text",
            text: info,
            sender: {
                name: Constants.OSELYA_SENDER,
            },
            keyboard: {
                Type: "keyboard",
                InputFieldState: "hidden",
                DefaultHeight: false,
                Buttons: [
                    {
                        ActionType: "open-url",
                        // eslint-disable-next-line max-len
                        ActionBody: "https://oselya.life/payment",
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
        const helper = new MessageHelper(welcomeMessage);
        return await helper.send();
    }
}
