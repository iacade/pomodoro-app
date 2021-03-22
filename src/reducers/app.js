import { minToSec } from "../helpers/time";
import Timer from "../helpers/timer";
import ConfigStorage from "../helpers/config-storage";
import * as Validators from "../helpers/validator";

const storage = new ConfigStorage()
    .addValidator({
        activeTab: new Validators.OneOf([ "pomodoro", "short", "long" ]),
        shakeAnim: new Validators.Boolean(),
        times: {
            pomodoro: new Validators.Number({ min: 1, max: minToSec(59) }),
            short: new Validators.Number({ min: 1, max: minToSec(59) }),
            long: new Validators.Number({ min: 1, max: minToSec(59) }),
        },
        elapsed: new Validators.AlwaysFalse(),
        clockState: new Validators.AlwaysFalse(),
        settings: {
            font: new Validators.OneOf([ "kumbh-sans", "roboto-slab", "space-mono" ]),
            color: new Validators.OneOf([ "tomato", "cyan", "purple" ])
        }
    });
const initial = storage.fetch({
    activeTab: "pomodoro",
    shakeAnim: false,
    times: {
        pomodoro: minToSec(25),
        short: minToSec(1),
        long: minToSec(15)
    },
    elapsed: 0,
    clockState: "init",
    settings: {
        font: "kumbh-sans",
        color: "tomato"
    }
});
let savedState = null;

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
    },
    "save-state": (state) => {
        savedState = state;

        return false;
    },
    "restore-state": (_, action) => {
        const restoredState = savedState;

        savedState = null;

        return action.apply ? null : restoredState;
    }
};

function reducer(state, action) {
    const newState = reducers[action.type]?.(state, action);

    if (newState) {
        const resultState = Object.assign({}, state, newState);

        if (!savedState) {
            // if settings is being adjusted
            // we aren't gonna to save state
            storage.save(resultState);
        }

        return resultState;
    }
    else {
        return state;
    }
}

export {
    reducer,
    initial
};
