import { useContext } from "react";
import PropTypes from "prop-types";
import Text from "../text/Text";
import Button from "./form/Button";
import Number from "./form/Number";
import Use from "./svg/Use";
import AppContext from "../context/AppContext";
import { minToSec, secToMin } from "../helpers/time";
import Radio from "./form/Radio";
import { classes } from "../helpers/classes";

const numberInputs = [{
    name: "pomodoro",
    text: Text.POMODORO
}, {
    name: "short",
    text: Text.SHORT_BREAK
}, {
    name: "long",
    text: Text.LONG_BREAK,
    className: "w-100"
}];

const fontRadios = [{
    font: "kumbh-sans",
    className: "mr-3"
}, {
    font: "roboto-slab",
    className: "mr-3"
}, {
    font: "space-mono"
}];

const colorRadios = [{
    color: "tomato",
    className: "tomato mr-3"
}, {
    color: "cyan",
    className: "cyan mr-3"
}, {
    color: "purple",
    className: "purple"
}];

function Settings(props) {
    const { state, dispatch } = useContext(AppContext);
    const handleTimeChange = ({ name, value }) => dispatch({
        type: "settings-time-change",
        name: name,
        value: minToSec(value)
    });
    const handleFontChange = ({ target: { checked, value } }) => {
        if (checked) {
            dispatch({
                type: "settings-font-change",
                value: value
            });
        }
    };
    const handleColorChange = ({ target: { checked, value } }) => {
        if (checked) {
            dispatch({
                type: "settings-color-change",
                value: value
            });
        }
    };
    const renderNumber = (name, text, className) => (
        <Number key={ name }
            className={ className || "w-100 mr-4" }
            name={ name }
            value={ secToMin(state.times[name]) }
            onChange={ handleTimeChange }
            placeholder={ text }
            min={ 1 }
            max={ 59 } />
    );
    const renderFontRadio = (font, className) => (
        <Radio key={ font }
            className={ classes({
                ["font-" + font]: true,
                [className]: true
            }) }
            name="font"
            value={ font }
            onChange={ handleFontChange }
            checked={ state.settings.font === font }>
                Aa
        </Radio>
    );
    const renderColorRadio = (color, className) => (
        <Radio key={ color }
            className={ className }
            name="color"
            value={ color }
            onChange={ handleColorChange }
            checked={ state.settings.color === color }/>
    );

    return (
        <div className="settings">
            <div className="settings__top">
                <h2>{ Text.SETTINGS_TITLE }</h2>
                <Button icon={ true } className="blue-color" onClick={ props.onClose }>
                    <Use icon="close" width="14" height="14" />
                </Button>
            </div>
            <div className="settings__content">
                <div className="settings__item">
                    <h4 className="mb-4">{ Text.SETTINGS_TIME }</h4>
                    <div className="flex">
                        { numberInputs.map(({ name, text, className }) => renderNumber(name, text, className)) }
                    </div>
                </div>
                <div className="settings__item flex align-between valign-center">
                    <h4>{ Text.SETTINGS_FONT }</h4>
                    <div className="flex">
                        { fontRadios.map(({ font, className }) => renderFontRadio(font, className)) }
                    </div>
                </div>
                <div className="settings__item flex align-between valign-center">
                    <h4>{ Text.SETTINGS_COLOR }</h4>
                    <div className="flex">
                        { colorRadios.map(({ color, className }) => renderColorRadio(color, className)) }
                    </div>
                </div>
            </div>
            <div className="settings__button">
                <Button text="Apply" onClick={ props.onApply } />
            </div>
        </div>
    );
}

Settings.propTypes = {
    onClose: PropTypes.func
};

export default Settings;
