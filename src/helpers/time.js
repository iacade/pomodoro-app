const SEC_IN_MIN = 60;
const SEC_IN_HOUR = 3600;

export function minToSec(value) {
    return value * SEC_IN_MIN;
}

export function secToMin(value) {
    return value / SEC_IN_MIN;
}

export function format(secondsCount) {
    const minutes = Math.floor(secondsCount / SEC_IN_MIN);
    const seconds = secondsCount % SEC_IN_HOUR % SEC_IN_MIN;

    return { minutes, seconds };
}

export function withZeroLead(value) {
    if (value < 10) {
        return "0" + value;
    }

    return value.toString();
}
