import RequestHandler from "./RequestHandler";
import PropertyMenu from "./handlers/PropertyMenu";
import BalanceInfo from "./handlers/BalanceInfo";
import SavePhoneNumber from "./handlers/SavePhoneNumber";
import SaveClaim from "./handlers/SaveClaim";
import CreateClaim from "./handlers/CreateClaim";
import WelcomeMessage from "./handlers/WelcomeMessage";
import SelectProperty from "./handlers/SelectProperty";

/**
 * Bot Runner
 *
 * Please don't forget to add new Handler to the collection
 */
export default class BotRunner {
    handlers: Array<RequestHandler>;

    /**
     * Create handlers
     *
     * @param {string} body
     */
    constructor(body: string) {
        this.handlers = [
            new WelcomeMessage(body),
            new SelectProperty(body),
            new SavePhoneNumber(body),
            new PropertyMenu(body),
            new BalanceInfo(body),
            new SaveClaim(body),
            new CreateClaim(body),
        ];
    }

    /**
     * Run handler execution one by one
     */
    async run() {
        for (const handler of this.handlers) {
            if (await handler.execute()) {
                break;
            }
        }
    }
}
