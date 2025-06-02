export const observerMixin = {
    observers: new Set(),

    addObserver(observer) {
        this.observers.add(observer);
    },

    removeObserver(observer) {
        this.observers.delete(observer);
    },

    notify() {
        this.observers.forEach((observer) => observer());
    }
};