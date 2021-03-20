import { useContext, useLayoutEffect, useRef, useState } from "react";
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
    const { dispatch } = useContext(AppContext);
    const [ maskLeft, setMaskLeft ] = useState(0);
    const [ maskWidth, setMaskWidth ] = useState(0);

    useLayoutEffect(() => {
        const section = sectionRef.current;

        if (!section || !props.active) {
            return;
        }

        const tab = section.querySelector(".tabs__item--active");
        const { left: offsetLeft } = section.getBoundingClientRect();
        const { width, left } = tab.getBoundingClientRect();

        setMaskLeft(left - offsetLeft);
        setMaskWidth(width);
    }, [ props.active ]);

    const handleClick = ({ target }) => {
        const item = target.closest(".tabs__item");

        if (item) {
            dispatch({
                type: "change-type",
                value: item.dataset.key
            });
        }
    };

    const maskStyle = {
        left: maskLeft,
        width: maskWidth
    };

    return (
        <section ref={ sectionRef } className="relative">
            <span style={ maskStyle } className="tabs-active-mask"></span>
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

export default Tabs;
