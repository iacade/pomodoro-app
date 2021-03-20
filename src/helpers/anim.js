export class Animation {
    startTime = null
    duration = null
    fromValue = null
    toValue = null
    value = null
    animator = null

    constructor({
        startTime = 0,
        duration = 400,
        fromValue = null,
        toValue = null,
        value = 0
    } = {}, animator = null) {
        this.startTime = startTime;
        this.duration = duration;
        this.fromValue = fromValue ?? value;
        this.toValue = toValue ?? value;
        this.value = value;
        this.animator = animator;
    }

    set(value) {
        this.fromValue = value;
        this.toValue = value;
        this.value = value;
    }

    play(toValue) {
        this.startTime = this.animator?.time;
        this.fromValue = this.value;
        this.toValue = toValue;
    }

    update(time) {
        if (this.value === this.toValue) {
            return false;
        }

        let elapsed = (time - this.startTime) / this.duration;

        if (elapsed > 1) {
            elapsed = 1;
        }
        else if (elapsed < 0) {
            elapsed = 0;
        }

        this.value = this.fromValue + (this.toValue - this.fromValue) * elapsed;

        return true;
    }
}

export class Animator {
    time = 0
    animations = []
    listeners = new Map()

    constructor() {
        requestAnimationFrame(this.render);
    }

    render = (time) => {
        this.time = time;

        for (const anim of this.animations) {
            if (anim.update(this.time)) {
                this.listeners.get(anim)?.();
            }
        }

        requestAnimationFrame(this.render);
    }

    makeAnimation(value, duration) {
        const animation = new Animation({
            startTime: this.time,
            duration: duration,
            value: value
        }, this);

        this.animations.push(animation);

        return animation;
    }

    onUpdate(animation, listener) {
        this.listeners.set(animation, listener);
    }
}
