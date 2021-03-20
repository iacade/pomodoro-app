import Text from "../text/Text";
import { calcArcAngles, describeArc } from "../helpers/geometry";
import { format, withZeroLead } from "../helpers/time";

function Clock(props) {
    const {
        start: startAngle,
        end: endAngle
    } = calcArcAngles(props.elapsed, props.total);

    const left = format(props.total - props.elapsed);
    const leftMin = withZeroLead(left.minutes);
    const leftSec = withZeroLead(left.seconds);
    const arc = describeArc(180, 180, 165, startAngle, endAngle);

    return (
        <section className="clock">
            <div className="clock__content">
                <span className="clock__arc theme-color">
                    <svg viewBox="0 0 360 360">
                        <path d={ arc } fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round">
                        </path>
                    </svg>
                </span>
                <h1 className="clock__timer">
                    { leftMin + ":" + leftSec }
                </h1>
                <button className="clock__state" onClick={ props.onAction }>
                    <h3>{ Text.CLOCK_BUTTON[props.state] }</h3>
                </button>
            </div>
        </section>
    );
}

export default Clock;
