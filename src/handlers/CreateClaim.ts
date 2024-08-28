import RequestHandler from "../RequestHandler";
import {AxiosResponse} from "axios";
import MessageHelper from "../MessageHelper";
import Constants from "../Constants";

/**
 * Create complain request
 */
export default class CreateClaim extends RequestHandler {
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
        return this.body.message?.text === Constants.CREATE_CLAIM;
    }

    /**
     * handler
     */
    async handle(): Promise<AxiosResponse> {
        const welcomeMessage: Message = {
            receiver: this.body.sender.id,
            min_api_version: 7,
            tracking_data: Constants.CREATE_CLAIM,
            type: "text",
            text: Constants.CLAIM_INVITE,
            sender: {
                name: Constants.OSELYA_SENDER,
            },
            keyboard: {
                Type: "keyboard",
                InputFieldState: "regular",
                DefaultHeight: false,
                Buttons: [
                    {
                        ActionType: "reply",
                        ActionBody: Constants.PROPERTY_REQUEST,
                        Columns: 6,
                        Rows: 1,
                        // eslint-disable-next-line max-len
                        Text: "<font color='#FFFFFF' size=22>Відміна</font>",
                        BgColor: "#F0923F",
                        TextSize: "large",
                        TextHAlign: "center",
                        TextVAlign: "middle",
                        Silent: false,
                    },
                ],
            },
        };
        const helper = new MessageHelper(welcomeMessage);
        return await helper.send();
    }
}
