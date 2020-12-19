const state = new Proxy(Object.defineProperties(Object.create(null), {
    _callbacks: {
        configurable: false,
        value: {
            range: new Set(),
            destinationsDrawerOpen: new Set(),
            rangeDialogOpen: new Set()
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
            state._callbacks[property].add(callback)
            callback(state[property])
        }
    },
    unsubscribe: {
        configurable: false,
        value: function unsubscribe(property, callback) {
            checkValidity(property)
            return state._callbacks[property].delete(callback)
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