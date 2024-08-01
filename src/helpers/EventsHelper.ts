import { EventType } from "@/types/EventType";

export function MapEventsFromApi (evs: {$values: EventType[]} | null)  {

    let mappedEvents: EventType[] = [];

    if(evs){
        mappedEvents = evs.$values.map((e: EventType) => ({
            eventId: e.eventId,
            title: e.title,
            description: e.description,
            start: new Date(e.start),
            end: new Date(e.end),
            isDeleted: e.isDeleted,
            userId: e.userId
        }));
    }
    
    return mappedEvents;
}