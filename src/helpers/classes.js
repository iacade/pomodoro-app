function canObtainKeys(description) {
    return typeof description === "function"
        || (typeof description === "object" && description !== null);
}

export function classes(description) {
    if (!canObtainKeys(description)) {
        description = {};
    }

    return Object.keys(description)
        .filter(key => description[key])
        .join(" ");
}
