import { useEffect, useReducer } from "react";
import Button from "./form/Button";
import Tabs from "./Tabs";
import Clock from "./Clock";
import AppContext from "../context/AppContext";
import Text from "../text/Text";
import Timer from "../helpers/timer";
import { initial, reducer } from "../reducers/app";
import { classes } from "../helpers/classes";
import { format, withZeroLead } from "../helpers/time";

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

function timeToString(seconds) {
    const left = format(seconds);

    return `(${ withZeroLead(left.minutes) }:${ withZeroLead(left.seconds) })`;
}

function App() {
    const [ state, dispatch ] = useReducer(reducer, initial);
    const contextProvider = { state, dispatch };
    const className = classes({
        "app": true,
        [`app--${ state.settings.font }`]: state.settings.font,
        [`app--${ state.settings.color }`]: state.settings.color
    });
    const totalSeconds = state.times[state.activeTab];
    const elapsedSeconds = state.elapsed;
    const actionHandlers = {
        init: () => {
            dispatch({ type: "state", value: "run" });
            Timer.run(() => dispatch({ type: "tick" }));
        },
        run: () => {
            dispatch({ type: "state", value: "stop" });
            Timer.stop();
        },
        stop: () => {
            dispatch({ type: "state", value: "run" });
            Timer.run(() => dispatch({ type: "tick" }));
        },
        finish: () => {
            dispatch({ type: "reset" });
            Timer.run(() => dispatch({ type: "tick" }));
        }
    };
    const handleClockAction = () => actionHandlers[state.clockState]?.();

    useEffect(() => {
        let title = null;

        switch (state.clockState) {
            case "run":
                title = timeToString(totalSeconds - elapsedSeconds) + " | Pomodoro";
                break;
            case "stop":
                title = "⏸ " + timeToString(totalSeconds - elapsedSeconds) + " | Pomodoro";
                break;
            case "finish":
                title = "⏳ B U Z Z Z Z | Pomodoro";
                break;
            default:
                title = "Pomodoro";
                break;
        }

        document.title = title;
    });

    return (
        <AppContext.Provider value={ contextProvider }>
            <main className={ className }>
                <h2 className="app__title">{ Text.TITLE }</h2>
                
                <Tabs items={ tabsItems }
                    active={ state.activeTab } />
                
                <Clock active={ state.activeTab }
                    total={ totalSeconds }
                    elapsed={ elapsedSeconds }
                    state={ state.clockState }
                    onAction={ handleClockAction } />
                
                <Button />
            </main>
        </AppContext.Provider>
    );
}

export default App;
