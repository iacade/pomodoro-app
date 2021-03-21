function Use(props) {
    const { icon, ...restProps } = props;
    const href = `#${ icon }-icon`;

    return (
        <svg { ...restProps }>
            <use href={ href } />
        </svg>
    );
}

export default Use;
