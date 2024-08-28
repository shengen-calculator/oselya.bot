import Constants from "./Constants";
import {defineSecret} from "firebase-functions/params";
import axios, {
    AxiosRequestConfig,
    AxiosResponse,
    RawAxiosRequestHeaders,
} from "axios";

/**
 * Message helper class
 */
export default class MessageHelper {
    message: Message;

    /**
     *
     *
     * @param {Message} message
     */
    constructor(message: Message) {
        this.message = message;
    }

    /**
     * Send message to a viber server
     *
     */
    async send(): Promise<AxiosResponse> {
        const client = axios.create({
            baseURL: Constants.BASE_URL,
        });
        const apiKey = defineSecret(Constants.VIBER_API_KEY);
        const config: AxiosRequestConfig = {
            headers: {
                [Constants.HEADER_TOKEN_KEY]: apiKey.value(),
            } as RawAxiosRequestHeaders,
        };
        return await client.post(Constants.MESSAGE_URL, this.message, config);
    }
}
