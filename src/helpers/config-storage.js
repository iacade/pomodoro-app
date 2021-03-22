import { deepAsign } from "./object";
import { ValidatorBase } from "./validator";

export default class ConfigStorage {
    storage = null
    key = null
    validators = []

    constructor(storage = localStorage, key = "config") {
        this.storage = storage;
        this.key = key;
    }

    addValidator(validator) {
        this.validators.push(validator);

        return this;
    }

    validate(settings, validation) {
        if (!settings) {
            return;
        }

        for (const key in validation) {
            const validator = validation[key];

            if (validator instanceof ValidatorBase) {
                const isValid = validator.validate(settings[key]);

                if (!isValid) {
                    delete settings[key];
                }
            }
            else {
                this.validate(settings[key], validator);
            }
        }

        return settings;
    }

    fetch(defaultSettings = {}) {
        try {
            let settings = JSON.parse(this.storage.getItem(this.key));

            for (const validator of this.validators) {
                if (typeof validator === "function") {
                    settings = validator(settings);
                }
                else if (typeof validator === "object") {
                    settings = this.validate(settings, validator);
                }
            }

            return deepAsign(defaultSettings, settings);
        }
        catch (err) {
            console.error(err);

            this.storage.removeItem(this.key);
        }

        return defaultSettings;
    }

    save(state) {
        this.storage.setItem(this.key, JSON.stringify(state));

        return state;
    }
};
