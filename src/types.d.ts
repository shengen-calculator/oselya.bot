type RequestBody = {
    event: EventType,
    user_id: string,
    user: User,
    sender: User,
    message: Message
}

type EventType = "subscribed" | "unsubscribed" | "conversation_started" |
    "delivered" | "seen" | "message";

type MessageType = "text" | "url";

type Sender = {
    name: string
}

type Message = {
    receiver: string,
    min_api_version: number,
    sender?: Sender,
    type?: MessageType,
    text?: string,
    keyboard?: Keyboard,
    tracking_data?: string,
    contact?: Contact
}

type ButtonActionType = "share-phone" | "open-url" | "none" | "reply";
type ButtonTextSize = "small" | "regular" | "large";
type ButtonTextHorAlign = "left" | "center" | "right";
type ButtonTextVerAlign = "top" | "middle" | "bottom";
type KeyboardFieldState = "hidden" | "regular";
type KeyboardType = "keyboard"

type Button = {
    ActionType:ButtonActionType,
    ActionBody: string,
    Columns: number,
    Rows: number,
    Text: string,
    BgColor: string,
    TextSize: ButtonTextSize,
    TextHAlign: ButtonTextHorAlign,
    TextVAlign: ButtonTextVerAlign,
    Silent: boolean
}

type Keyboard = {
    Type: KeyboardType,
    InputFieldState: KeyboardFieldState,
    DefaultHeight: boolean,
    Buttons: Array<Button>
}

type User = {
    id: string,
    name: string
}

type Contact = {
    phone_number: string
}
