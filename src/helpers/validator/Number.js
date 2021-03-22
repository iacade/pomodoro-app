import ValidatorBase from "./ValidatorBase";

export default class Number extends ValidatorBase {
    min = null
    max = null
    canBeFloat = null

    constructor({ min = Number.MIN_SAFE_INTEGER,
        max = Number.MAX_SAFE_INTEGER,
        canBeFloat = false } = {}) {
        super();

        this.min = min;
        this.max = max;
        this.canBeFloat = canBeFloat;
    }

    validate(value) {
        if (!this.canBeFloat && value !== parseInt(value)) {
            return false;
        }

        return value >= this.min && value <= this.max;
    }
}
