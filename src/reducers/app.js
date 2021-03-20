import { minutes } from "../helpers/time";
import Timer from "../helpers/timer";

const initial = {
    activeTab: "pomodoro",
    times: {
        pomodoro: minutes(25),
        short: minutes(.25),
        long: minutes(15)
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

        return {
            activeTab: action.value
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
    })
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
