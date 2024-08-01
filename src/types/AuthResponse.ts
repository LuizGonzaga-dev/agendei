import { EventType } from "./EventType";

type TokenInfo = {
    token: string;
    validTo: Date;
}

export interface AuthResponse { 
    success: boolean
    message: string,
    tokenInfo: TokenInfo |null,
    events:{
        $values: EventType[];
    } | null;
}