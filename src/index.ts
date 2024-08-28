/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import {defineSecret} from "firebase-functions/params";
import * as crypto from "crypto";
import BotRunner from "./BotRunner";
import Constants from "./Constants";

export const chatBot = onRequest(async (request, response) => {
    const body = request["rawBody"].toString("utf8");
    logger.info(`Body -> ${body}`);
    const apiKey = defineSecret(Constants.VIBER_API_KEY);
    const key = crypto.createHmac("sha256",
        apiKey.value()).update(body).digest("hex");
    const viberToken = request.get("X-Viber-Content-Signature");

    if (key !== viberToken) {
        logger.info(`Key -> ${key}`);
        logger.info(`Viber token -> ${viberToken}`);
        response.status(500).send("Wrong token");
        return;
    }
    response.status(200).send("OK");

    const botRunner = new BotRunner(body);
    await botRunner.run();
});
