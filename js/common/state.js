/**
 @typedef {{
    range: number,
    rangeDialogOpen: boolean,
    destinationsDrawerOpen: boolean,
    _callbacks: {
        [K in keyof Omit<State, "_callbacks" | "subscribe" | "unsubscribe">]: ((value: State[K]) => void)[]
    },
    subscribe<T extends keyof Omit<State, "_callbacks" | "subscribe" | "unsubscribe">>(property: T, callback: (value: State[T]) => void): void,
    unsubscribe<T extends keyof Omit<State, "_callbacks" | "subscribe" | "unsubscribe">>(property: T, callback: (value: State[T]) => void): void
 }} State
 */

/** @type {State} */
const state = new Proxy(Object.defineProperties(Object.create(null), {
    _callbacks: {
        configurable: false,
        value: {
            range: [],
            destinationsDrawerOpen: [],
            rangeDialogOpen: []
        },
    },
    range: {
        configurable: false,
        writable: true,
        value: 15
    },
    destinationsDrawerOpen: {
        configurable: false,
        writable: true,
        value: false
    },
    rangeDialogOpen: {
        configurable: false,
        writable: true,
        value: false
    },
    subscribe: {
        configurable: false,
        value: function subscribe(property, callback) {
            checkValidity(property)
            state._callbacks[property].push(callback)
            callback(state[property])
        }
    },
    unsubscribe: {
        configurable: false,
        value: function unsubscribe(property, callback) {
            checkValidity(property)
            const index = state._callbacks[property].findIndex(cb => cb === callback)
            if (index < 0) {
                return false
            } else {
                state._callbacks[property].splice(index, 1)
                return true
            }
        }
    }
}), {
    set(target, property, value, receiver) {
        const previous = target[property]
        if (previous !== value)
            console.log(`state.${property} changed to ${value}`)
        state._callbacks[property].forEach(callback => callback(value))
        Reflect.set(target, property, value, receiver)
        return true
    }
})

/**
 * Checks whether or not `property` is a "valid" entry in `state`.
 * @param {string} property
 */
function checkValidity(property) {
    if (property in state && !["_callbacks", "subscribe", "unsubscribe"].includes(property)) {
        return true
    } else {
        throw TypeError(`"${property}" is not a valid key in state.  Try using one of: ${Object.getOwnPropertyNames(state).join(", ")}`)
    }
}

export default state