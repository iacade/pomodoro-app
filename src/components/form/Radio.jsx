import { useState } from "react";
import { classes } from "../../helpers/classes";

function Radio(props) {
    const [ isFocus, setIsFocus ] = useState(false);
    const className = classes({
        "x-radio": true,
        "x-radio--checked": props.checked,
        "x-radio--focus": isFocus,
        [props.className]: props.className
    });
    
    return (
        <label className={ className }>
            <input type="radio"
                name={ props.name }
                value={ props.value }
                checked={ props.checked }
                onChange={ props.onChange }
                onFocus={ () => setIsFocus(true) }
                onBlur={ () => setIsFocus(false) } />
            <span className="x-radio__border"></span>
            <div className="x-radio__content">
                { props.children || (<span className="x-radio__tick"></span>) }
            </div>
        </label>
    );
}

export default Radio;
