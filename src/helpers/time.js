const SEC_IN_MIN = 60;
const SEC_IN_HOUR = 3600;

export function minutes(value) {
    return value * SEC_IN_MIN;
}

export function format(secondsCount) {
    const hours = Math.floor(secondsCount / SEC_IN_HOUR);
    const minutes = Math.floor((secondsCount % SEC_IN_HOUR) / SEC_IN_MIN);
    const seconds = secondsCount % SEC_IN_HOUR % SEC_IN_MIN;

    return { hours, minutes, seconds };
}

export function withZeroLead(value) {
    if (value < 10) {
        return "0" + value;
    }

    return value;
}
