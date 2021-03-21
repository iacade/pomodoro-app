import { minToSec } from "../helpers/time";
import Timer from "../helpers/timer";

const initial = {
    activeTab: "pomodoro",
    shakeAnim: false,
    times: {
        pomodoro: minToSec(25),
        short: minToSec(1),
        long: minToSec(15)
    },
    elapsed: 0,
    clockState: "init", // one of: init, run, stop, finish
    settings: {
        font: "kumbh-sans",
        color: "tomato"
    }
};

const reducers = {
    "change-type": (state, action) => {
        if (state.activeTab === action.value) {
            return false;
        }
        if (state.clockState === "run") {
            return {
                shakeAnim: true
            };
        }

        return {
            activeTab: action.value,
            clockState: "init",
            elapsed: 0
        };
    },
    "state": (state, action) => {
        if (action.value === state.clockState) {
            return false;
        }

        return {
            clockState: action.value
        };
    },
    "tick": (state, action) => {
        const total = state.times[state.activeTab];
        let newElapsed = state.elapsed + (action.value || 1);
        let newClockState = state.clockState;

        if (newElapsed >= total) {
            newElapsed = total;
            newClockState = "finish";
            Timer.stop();
        }

        return {
            elapsed: newElapsed,
            clockState: newClockState
        };
    },
    "reset": () => ({
        elapsed: 0,
        clockState: "run"
    }),
    "settings-time-change": (state, action) => {
        const { name, value } = action;

        if (!(name in state.times) || state.times[name] === value) {
            return false;
        }

        return {
            times: {
                ...state.times,
                [name]: value
            }
        };
    },
    "settings-font-change": (state, action) => {
        const { value } = action;

        if (state.settings.font === value) {
            return false;
        }

        return {
            settings: {
                ...state.settings,
                font: value
            }
        };
    },
    "settings-color-change": (state, action) => {
        const { value } = action;

        if (state.settings.color === value) {
            return false;
        }

        return {
            settings: {
                ...state.settings,
                color: value
            }
        };
    },
    "clear-shake-anim": (state) => {
        if (!state.shakeAnim) {
            return false;
        }

        return {
            shakeAnim: false
        };
    }
};

function reducer(state, action) {
    const newState = reducers[action.type]?.(state, action);

    if (newState) {
        return Object.assign({}, state, newState);
    }
    else {
        return state;
    }
}

export {
    reducer,
    initial
};
