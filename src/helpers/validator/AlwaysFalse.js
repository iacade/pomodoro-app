import ValidatorBase from "./ValidatorBase";

export default class AlwaysFalse extends ValidatorBase {
    validate() {
        return false;
    }
}
