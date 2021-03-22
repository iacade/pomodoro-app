import ValidatorBase from "./ValidatorBase";

export default class OneOf extends ValidatorBase {
    allowedValues = null
    
    constructor(values = []) {
        super();

        this.allowedValues = Array.isArray(values) ? values : [ values ];
    }
    
    validate(value) {
        return this.allowedValues.includes(value);
    }
}
