import { classes } from "../../helpers/classes";

function Button(props) {
    const className = classes({
        "x-button": true,
        "x-button--icon": props.icon,
        [props.className]: props.className
    });

    return (
        <button className={ className }
            onFocus={ props.onFocus }
            onBlur={ props.onBlur }
            onClick={ props.onClick }>
            <div className="x-button__content">
                { props.children || props.text }
            </div>
        </button>
    );
}

export default Button;
