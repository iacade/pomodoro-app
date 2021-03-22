import ValidatorBase from "./ValidatorBase";

export default class Boolean extends ValidatorBase {
    validate(value) {
        return typeof value === "boolean";
    }
}
