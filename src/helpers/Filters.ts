import { EventType } from "@/types/EventType";
import { Dayjs } from "dayjs";

type eventsOnDayProps = {
    allEvents : EventType[];
    day: Dayjs;
}

export function thereAreEventsOnDay(params:eventsOnDayProps): boolean {
    const {allEvents, day} = params;
    return allEvents.some(selectedDay => day.isSame(selectedDay.start, 'day'));
}

export function filterEventsByDay(params: eventsOnDayProps): EventType[] {
    const {allEvents, day} = params;
    return allEvents.filter(selectedDay => day.isSame(selectedDay.start, 'day'));
}

export function countEventsOnDay(params: eventsOnDayProps) : number {
    return filterEventsByDay(params).length;
}