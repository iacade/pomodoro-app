export default new class {
    intervalId = 0

    run(callback) {
        this.intervalId = setInterval(callback, 1000);

        return this;
    }

    stop() {
        clearInterval(this.intervalId);

        return this;
    }
}();
