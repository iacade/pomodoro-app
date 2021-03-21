import { useState } from "react";
import { classes } from "../../helpers/classes";
import Use from "../svg/Use";
import Button from "./Button";

function Number(props) {
    const [ isFocus, setIsFocus ] = useState(false);
    const className = classes({
        "x-number": true,
        "x-number--focus": isFocus,
        [props.className]: props.className
    });
    const handleNewValue = (newValue) => {
        if (newValue < props.min) {
            newValue = props.min;
        }
        else if (newValue > props.max) {
            newValue = props.max;
        }
    
        if (newValue !== props.value) {
            props.onChange?.({
                name: props.name,
                value: newValue
            });
        }
    };
    const handleChange = (event) => {
        let newValue = +event.target.value
            .toString().replace(/\D/g, "");
        handleNewValue(newValue);
    };
    const handleIncrement = (positive) => {
        handleNewValue(props.value + (positive ? 1 : -1));
    };

    return (
        <label className={ className }>
            <span className="x-number__placeholder">{ props.placeholder || props.name }</span>
            <div className="x-number__field">
                <input type="text"
                    name={ props.name }
                    value={ props.value }
                    onChange={ handleChange }
                    onFocus={ () => setIsFocus(true) }
                    onBlur={ () => setIsFocus(false) } />
                <div className="x-number__spinner">
                    <Button icon={ true }
                        onClick={ () => handleIncrement(true) }
                        onFocus={ () => setIsFocus(true) }
                        onBlur={ () => setIsFocus(false) }
                        className="x-number__spinner-up light">
                        <Use icon="arrow-up" width="14" height="7" />
                    </Button>
                    <Button icon={ true }
                        onClick={ () => handleIncrement(false) }
                        onFocus={ () => setIsFocus(true) }
                        onBlur={ () => setIsFocus(false) }
                        className="x-number__spinner-down light">
                        <Use icon="arrow-up" width="14" height="7" />
                    </Button>
                </div>
            </div>
        </label>
    );
}

export default Number;
