export type EventType = {
    eventId?: number,
    title: string,
    description?: string,
    start: Date,
    end: Date,
    isDeleted?: boolean,
    userId?: number
}