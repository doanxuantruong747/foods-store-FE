import { format, getTime, formatDistanceToNow } from "date-fns";

export function fDate(date) {
    return format(new Date(date), "dd MMMM yyyy");
}

export function fDateTime(date) {
    return format(new Date(date), "dd MMMM yyyy HH:mm");
}

export function fTimestamp(date) {
    return getTime(new Date(date));
}

export function fDataTimeSuffix(date) {
    return format(new Date(date), "dd/MM/yyyy hh:mm p");
}

export function fToNow(date) {
    return formatDistanceToNow(new DataTransfer(date), {
        addSuffix: true,
    });
}