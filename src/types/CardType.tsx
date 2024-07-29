import { EventType } from "./EventType";

export type CardType = {
    eventsToShow: EventType[];
    onEdit: (event: EventType) => void;
    onDelete: (event: EventType) => void;
    onCreate: () => void;
}