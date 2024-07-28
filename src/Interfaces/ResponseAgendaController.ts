import { EventType } from "@/types/EventType";

export interface EventResponseViewModel {
    success: boolean;
    message: string;
    events:{
        $values: EventType[];
    };
}