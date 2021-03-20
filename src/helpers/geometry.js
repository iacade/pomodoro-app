const ARC = {
    TOP: Math.PI + Math.PI / 2,
    QUARTER: Math.PI / 2,
    HALF: Math.PI,
    FULL: 2 * Math.PI
};
const MIN_PERCENT_ELAPSED = 0.001;

function polarToCartesian(centerX, centerY, radius, angle) {
    return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
    };
}

export function calcArcAngles(elapsed, total) {
    let elapsedPercent = elapsed / total;

    if (elapsedPercent === 0 || elapsedPercent === 1) {
        // If no time elapsed
        // or if time totally elapsed
        // we gonna render full arc
        elapsedPercent = MIN_PERCENT_ELAPSED;
    }

    const leftPercent = 1 - elapsedPercent;
    const startAngle = ARC.HALF + ARC.QUARTER; // arc starts at the highest point
    const endAngle = startAngle + ARC.FULL * leftPercent;

    return {
        start: startAngle,
        end: endAngle
    };
}

export function describeArc(centerX, centerY, radius, startAngle, endAngle) {
    const startPoint = polarToCartesian(centerY, centerY, radius, startAngle);
    const endPoint = polarToCartesian(centerX, centerY, radius, endAngle);
    const largeArcFlag = endAngle > startAngle + Math.PI ? 1 : 0;
    const sweepFlag = 1;
    const xAxisRotation = 0;

    return [
        "M", startPoint.x, startPoint.y,
        "A", radius, radius, xAxisRotation,
        largeArcFlag, sweepFlag,
        endPoint.x, endPoint.y
    ].join(" ");
}
