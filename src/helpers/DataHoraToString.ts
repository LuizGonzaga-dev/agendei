import moment from 'moment';

export function DD_MM_YYYY (data: Date) : string {
    return moment(data).format('DD/MM/YYYY');
}

export function HH_MM(data: Date): string {
    return moment(data).format("HH:mm");
}
