export function deepAsign(target, source) {
    for (const key in source) {
        if (typeof source[key] === "object"
            && typeof target[key] === "object") {
            deepAsign(target[key], source[key]);
        }
        else {
            target[key] = source[key];
        }
    }

    return target;
}
