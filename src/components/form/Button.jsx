import PropTypes from "prop-types";
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

Button.propTypes = {
    children: PropTypes.node,
    text: PropTypes.string,
    icon: PropTypes.bool,
    className: PropTypes.string,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onClick: PropTypes.func
};

export default Button;
