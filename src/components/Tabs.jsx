import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import AppContext from "../context/AppContext";
import { classes } from "../helpers/classes";

function TabsItem(props) {
    const className = classes({
        "tabs__item": true,
        "tabs__item--active": props.active
    });

    return (
        <li>
            <button className={ className } data-key={ props.name }>
                { props.text }
            </button>
        </li>
    );
}

function Tabs(props) {
    const sectionRef = useRef(null);
    const { state, dispatch } = useContext(AppContext);
    const [ maskLeft, setMaskLeft ] = useState(0);
    const [ maskWidth, setMaskWidth ] = useState(0);

    const alignMaskItem = () => {
        const section = sectionRef.current;

        if (!section || !props.active) {
            return;
        }

        const tab = section.querySelector(".tabs__item--active");
        const { left: offsetLeft } = section.getBoundingClientRect();
        const { width, left } = tab.getBoundingClientRect();

        setMaskLeft(left - offsetLeft);
        setMaskWidth(width);
    };

    useLayoutEffect(alignMaskItem, [ props.active ]);
    useEffect(() => {
        window.addEventListener("resize", alignMaskItem);
        
        return () => window.removeEventListener("resize", alignMaskItem);
    }, []);

    const handleClick = ({ target }) => {
        const item = target.closest(".tabs__item");

        if (item) {
            dispatch({
                type: "change-type",
                value: item.dataset.key
            });
        }
    };

    const handleAnimationEnd = () => dispatch({
        type: "clear-shake-anim"
    });

    const maskClassName = classes({
        "tabs-active-mask": true,
        "tabs-active-mask--shaked": state.activeTabShaked
    });
    const maskStyle = {
        left: maskLeft,
        width: maskWidth
    };

    return (
        <section ref={ sectionRef } className="relative">
            <span style={ maskStyle }
                className={ maskClassName }
                onAnimationEnd={ handleAnimationEnd }></span>
            <ul className="tabs" onClick={ handleClick }>
                { props.items.map(({ key, text }) =>
                    <TabsItem key={ key }
                        name={ key }
                        text={ text }
                        active={ props.active === key } />) }
            </ul>
        </section>
    );
}

Tabs.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    })).isRequired,
    active: PropTypes.string.isRequired
};

export default Tabs;
