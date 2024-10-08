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
import {setGlobalOptions} from "firebase-functions/v2";
import TelegramRunner from "./TelegramRunner";

setGlobalOptions({region: "europe-west1"});

export const viberBot = onRequest(async (request, response) => {
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

export const telegramBot = onRequest(async (request, response) => {
    const body = request["rawBody"].toString("utf8");
    logger.info(`Body -> ${body}`);
    const token = request.get("X-Telegram-Bot-Api-Secret-Token");
    const telegramToken = defineSecret(Constants.TELEGRAM_TOKEN);
    if (token !== telegramToken.value()) {
        logger.info(`Token -> ${token}`);
        logger.info(`Telegram token -> ${telegramToken.value()}`);
        response.status(500).send("Wrong token");
        return;
    }
    response.status(200).send("OK");

    const telegramRunner = new TelegramRunner(body);
    await telegramRunner.run();
});
