import PropTypes from "prop-types";
import { classes } from "../helpers/classes";

function Modal(props) {
    const className = classes({
        "modal": true,
        "modal--opened": props.opened
    });
    const handleClick = ({ target }) => {
        if (!target.closest(".modal__content")) {
            props.onClose?.();
        }
    };

    return (
        <div className={ className } onClick={ handleClick }>
            <div className="modal__content">
                { props.children }
            </div>
        </div>
    );
}

Modal.propTypes = {
    children: PropTypes.node,
    opened: PropTypes.bool,
    onClose: PropTypes.func
};

export default Modal;
