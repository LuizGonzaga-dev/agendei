import { EventType } from "./EventType";

export type EventsResponseType = {
    success:boolean,
    message:string,
    events: EventType[]
}