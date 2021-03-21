import { useEffect, useState } from "react";
import { Animator } from "../helpers/anim";

const animator = new Animator();
const animations = new Map();

export default function useTransition(nextValue, duration) {
    const [ value, setValue ] = useState(nextValue);
    let animation = animations.get(setValue);

    if (!animation) {
        animation = animator.makeAnimation(0, duration);
        animations.set(setValue, animation);
    }

    useEffect(() => {
        animation.set(nextValue);
        animator.onUpdate(animation, () => setValue(animation.value));
    }, []);

    useEffect(() => {
        animation.duration = duration;
    }, [ duration ]);

    useEffect(() => {
        animation.play(nextValue);
    }, [ nextValue ]);

    return value;
}
