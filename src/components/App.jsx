import { useEffect, useReducer, useState } from "react";
import Button from "./form/Button";
import Tabs from "./Tabs";
import Clock from "./Clock";
import AppContext from "../context/AppContext";
import Text from "../text/Text";
import Timer from "../helpers/timer";
import { initial, reducer } from "../reducers/app";
import { classes } from "../helpers/classes";
import { format, withZeroLead } from "../helpers/time";
import SvgSource from "./svg/Source";
import Use from "./svg/Use";
import Modal from "./Modal";
import Settings from "./Settings";

const tabsItems = [{
    key: "pomodoro",
    text: Text.POMODORO
}, {
    key: "short",
    text: Text.SHORT_BREAK
}, {
    key: "long",
    text: Text.LONG_BREAK
}];
const audio = new Audio("/audio/audio.mp3");

function timeToString(seconds) {
    const left = format(seconds);

    return `(${ withZeroLead(left.minutes) }:${ withZeroLead(left.seconds) })`;
}

function App() {
    const [ state, dispatch ] = useReducer(reducer, initial);
    const [ isModal, setIsModal ] = useState(false);
    const contextProvider = { state, dispatch };
    const totalSeconds = state.times[state.activeTab];
    const elapsedSeconds = state.elapsed;
    const actionRun = () => {
        dispatch({ type: "state", value: "run" });
        Timer.run(() => dispatch({ type: "tick" }));
    };
    const actionStop = () => {
        dispatch({ type: "state", value: "stop" });
        Timer.stop();
    };
    const actionReset = () => {
        dispatch({ type: "reset" });
        Timer.run(() => dispatch({ type: "tick" }));
    };
    const handleClockAction = () => {
        switch (state.clockState) {
            case "run":
                actionStop();
                break;
            case "finish":
                actionReset();
                break;
            default:
                actionRun();
        }
    };
    const handleOpenModal = () => {
        if (state.clockState !== "run") {
            dispatch({ type: "save-state" });
            setIsModal(true);
        }
        else {
            dispatch({ type: "set-shake-anim" });
        }
    };
    const handleCloseModal = (applyChanges) => {
        dispatch({ type: "restore-state", apply: applyChanges });

        setIsModal(false);
    };

    useEffect(() => {
        let title = null;

        switch (state.clockState) {
            case "run":
                title = timeToString(totalSeconds - elapsedSeconds) + " | Pomodoro";
                break;
            case "stop":
                title = "??? " + timeToString(totalSeconds - elapsedSeconds) + " | Pomodoro";
                break;
            case "finish":
                title = "??? B U Z Z Z | Pomodoro";
                break;
            default:
                title = "Pomodoro";
                break;
        }

        document.title = title;
    });

    useEffect(() => {
        if (state.clockState === "finish") {
            audio.currentTime = 0;
            audio.play();
        }
        else {
            audio.pause();
        }
    }, [ state.clockState ]);

    useEffect(() => {
        const handleWindowFocus = () => audio.pause();

        window.onfocus = handleWindowFocus;

        return () => window.onfocus = null;
    }, []);

    useEffect(() => {
        if (state.clockState === "run") {
            window.onbeforeunload = () => "Timer will be unset. Are you ready to sacrifice that?";
        }
        else {
            window.onbeforeunload = null;
        }
    }, [ state.clockState ]);

    const className = classes({
        "app": true,
        "app--modal": isModal,
        [`app--${ state.settings.font }`]: state.settings.font,
        [`app--${ state.settings.color }`]: state.settings.color
    });

    return (
        <AppContext.Provider value={ contextProvider }>
            <SvgSource />
            <main className={ className }>
                <h2 className="app__title">
                    <img src="/images/logo.svg" alt={ Text.TITLE } />
                </h2>

                <Tabs items={ tabsItems }
                    active={ state.activeTab } />

                <Clock active={ state.activeTab }
                    total={ totalSeconds }
                    elapsed={ elapsedSeconds }
                    state={ state.clockState }
                    onAction={ handleClockAction }
                    shakeAnim={ state.shakeAnim }
                    onEndShake={ () => dispatch({ type: "clear-shake-anim" }) } />

                <Button icon={ true } onClick={ handleOpenModal }>
                    <Use icon="settings" width="28" height="28" />
                </Button>

                <Modal opened={ isModal } onClose={ () => handleCloseModal(false) }>
                    <Settings onClose={ () => handleCloseModal(false) } onApply={ () => handleCloseModal(true) } />
                </Modal>
            </main>
        </AppContext.Provider>
    );
}

export default App;
