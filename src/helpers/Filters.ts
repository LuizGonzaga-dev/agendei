import { EventType } from "@/types/EventType";
import dayjs from "dayjs";

type eventsOnDayProps = {
    allEvents : EventType[];
    day: Date;
}

export function thereAreEventsOnDay(params:eventsOnDayProps): boolean {
    const {allEvents, day} = params;
    return allEvents.some(selectedDay => dayjs(day).isSame(selectedDay.start, 'day'));
}

export function filterEventsByDay(params: eventsOnDayProps): EventType[] {
    const {allEvents, day} = params;
    return allEvents.filter(selectedDay => dayjs(day).isSame(selectedDay.start, 'day'));
}

export function countEventsOnDay(params: eventsOnDayProps) : number {
    return filterEventsByDay(params).length;
}