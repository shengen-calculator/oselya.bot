import RequestHandler from "../RequestHandler";
import MessageHelper from "../MessageHelper";
import {AxiosResponse} from "axios";
import Constants from "../Constants";

/**
 * Request phone number
 */
export default class WelcomeMessage extends RequestHandler {
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
        return this.body.event === "conversation_started";
    }

    /**
     * handler
     */
    async handle(): Promise<AxiosResponse> {
        const welcomeMessage: Message = {
            receiver: this.body.user.id,
            min_api_version: 7,
            type: "text",
            text: Constants.OSELYA_WELCOME,
            tracking_data: Constants.PHONE_REQUEST,
            sender: {
                name: Constants.OSELYA_SENDER,
            },
            keyboard: {
                Type: "keyboard",
                InputFieldState: "hidden",
                DefaultHeight: false,
                Buttons: [
                    {
                        ActionType: "share-phone",
                        ActionBody: "phone number",
                        Columns: 6,
                        Rows: 1,
                        // eslint-disable-next-line max-len
                        Text: `<font color="#FFFFFF" size=24>${Constants.SHARE_PHONE_BTN}</font>`,
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
