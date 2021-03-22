export class ValidatorBase {
    validate() {
        return true;
    }
}

export class AlwaysFalse extends ValidatorBase {
    validate() {
        return false;
    }
}

export class OneOf extends ValidatorBase {
    allowedValues = null
    
    constructor(values = []) {
        super();

        this.allowedValues = Array.isArray(values) ? values : [ values ];
    }
    
    validate(value) {
        return this.allowedValues.includes(value);
    }
}

export class Boolean extends ValidatorBase {
    validate(value) {
        return typeof value === "boolean";
    }
}

export class Number extends ValidatorBase {
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
