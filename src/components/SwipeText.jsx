import { useLayoutEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { classes } from "../helpers/classes";
import { useSwipe } from "../hooks/useSwipe";

function SwipeText(props) {
    const [ oldText, text ] = useSwipe(props.text);
    const [ left, setLeft ] = useState(0);
    const spanRef = useRef(null);

    useLayoutEffect(() => {
        if (!spanRef.current) {
            return;
        }

        const span = spanRef.current;
        const newSpan = span.querySelector(".swipe-text__new");
        
        // simulates text content to be equal to old value
        // to center text
        //
        const newSpanText = newSpan.textContent;
        newSpan.textContent = oldText;
        const { left } = newSpan.getBoundingClientRect();
        newSpan.textContent = newSpanText;

        const { left: offsetLeft } = span.getBoundingClientRect();

        setLeft(left - offsetLeft);
    }, [ spanRef, oldText ]);

    const className = classes({
        "swipe-text": true,
        "swipe-text--updated": oldText
    });
    const oldStyle = {
        left: left
    };

    // adds keys for spans to restart css animation
    return (
        <span ref={ spanRef } className={ className }>
            <span key={ oldText } style={ oldStyle } className="swipe-text__old">{ oldText }</span>
            <span key={ text } className="swipe-text__new">{ text }</span>
        </span>
    );
}

SwipeText.propTypes = {
    text: PropTypes.string.isRequired
};

export default SwipeText;
