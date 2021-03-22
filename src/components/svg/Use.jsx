import PropTypes from "prop-types";

function Use(props) {
    const { icon, ...restProps } = props;
    const href = `#${ icon }-icon`;

    return (
        <svg { ...restProps }>
            <use href={ href } />
        </svg>
    );
}

Use.propTypes = {
    icon: PropTypes.string.isRequired
};

export default Use;
