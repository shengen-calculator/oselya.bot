import RequestHandler from "../RequestHandler";
import {AxiosResponse} from "axios";
import MessageHelper from "../MessageHelper";
import Constants from "../Constants";

/**
 * Request phone number
 */
export default class SavePhoneNumber extends RequestHandler {
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
        return this.body.message?.tracking_data === Constants.PHONE_REQUEST;
    }

    /**
     * handler
     */
    async handle(): Promise<AxiosResponse> {
        //  save user to DB
        //  const phone = this.body.message.contact?.phone_number;

        const selectPropertyMessage: Message = {
            receiver: this.body.sender.id,
            min_api_version: 7,
            tracking_data: Constants.PROPERTY_REQUEST,
            keyboard: {
                Type: "keyboard",
                InputFieldState: "hidden",
                DefaultHeight: false,
                Buttons: [
                    {
                        ActionType: "reply",
                        ActionBody: "id:12132342",
                        Columns: 6,
                        Rows: 1,
                        // eslint-disable-next-line max-len
                        Text: "<font color='#FFFFFF' size=22>вул. Шевченка 12Б кв.10</font>",
                        BgColor: "#F0923F",
                        TextSize: "large",
                        TextHAlign: "center",
                        TextVAlign: "middle",
                        Silent: false,
                    },
                    {
                        ActionType: "reply",
                        ActionBody: "id:784775832",
                        Columns: 6,
                        Rows: 1,
                        // eslint-disable-next-line max-len
                        Text: "<font color='#FFFFFF' size=22>пл. Наукова 19В корп.7 кв.10</font>",
                        BgColor: "#F0923F",
                        TextSize: "large",
                        TextHAlign: "center",
                        TextVAlign: "middle",
                        Silent: false,
                    },
                ],
            },
        };
        const helper = new MessageHelper(selectPropertyMessage);
        return await helper.send();
    }
}
