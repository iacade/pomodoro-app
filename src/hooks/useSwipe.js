import { useEffect, useState } from "react";

export function useSwipe(newValue) {
    const [ oldValue, setOldValue ] = useState(false);
    const [ value, setValue ] = useState(newValue);

    useEffect(() => {
        if (newValue !== value) {
            setOldValue(value);
        }

        setValue(newValue);
    }, [ newValue, value ]);

    return [ oldValue, value ];
}
