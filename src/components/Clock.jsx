import PropTypes from "prop-types";
import Text from "../text/Text";
import { calcArcAngles, describeArc } from "../helpers/geometry";
import { format, withZeroLead } from "../helpers/time";
import useTransition from "../hooks/useTransition";
import { classes } from "../helpers/classes";
import SwipeText from "./SwipeText";

const CLOCK_ARC = {
    CENTER_X: 180,
    CENTER_Y: 180,
    RADIUS: 165,
    STROKE_WIDTH: 10
};

function getElapsedForAnim(props) {
    if (props.state === "run") {
        return Math.min(props.total, props.elapsed + 1);
    }
    else if (props.state === "finish") {
        return 0;
    }

    return props.elapsed;
}

function getTransitionDuration(props) {
    switch (props.state) {
        case "finish":
        case "init":
            return 200;
        case "stop":
            return 100;
        default:
            return 1000;
    }
}

function Clock(props) {
    const {
        start: startAngle,
        end: endAngle
    } = calcArcAngles(getElapsedForAnim(props), props.total);

    const value = useTransition(endAngle, getTransitionDuration(props));
    const left = format(props.total - props.elapsed);
    const leftMin = withZeroLead(left.minutes);
    const leftSec = withZeroLead(left.seconds);
    const arc = describeArc(CLOCK_ARC.CENTER_X, CLOCK_ARC.CENTER_Y,
        CLOCK_ARC.RADIUS, startAngle, value);
    
    const textClassName = classes({
        "shake-anim": props.shakeAnim
    });

    // we can use SwipeText for minutes and seconds, but it seems
    // to be pretty only with monospace fonts
    //
    return (
        <section className="clock">
            <div className="clock__content">
                <span className="clock__arc theme-color">
                    <svg viewBox="0 0 360 360">
                        <path d={ arc } fill="none" stroke="currentColor" strokeWidth={ CLOCK_ARC.STROKE_WIDTH } strokeLinecap="round">
                        </path>
                    </svg>
                </span>
                <h1 className="clock__timer">
                    { leftMin }:{ leftSec }
                </h1>
                <button className="clock__state" onClick={ props.onAction }>
                    <h3 className={ textClassName }
                        onAnimationEnd={ props.onEndShake }>
                        <SwipeText text={ Text.CLOCK_BUTTON[props.state] } />
                    </h3>
                </button>
            </div>
        </section>
    );
}

Clock.propTypes = {
    state: PropTypes.oneOf([ "init", "run", "stop", "finish" ]).isRequired,
    total: PropTypes.number.isRequired,
    elapsed: PropTypes.number.isRequired,
    onAction: PropTypes.func.isRequired,
    shakeAnim: PropTypes.bool,
    onEndShake: PropTypes.func
};

export default Clock;
