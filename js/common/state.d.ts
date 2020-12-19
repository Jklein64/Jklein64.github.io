type Keys = keyof Omit<State, "_callbacks" | "subscribe" | "unsubscribe">

interface State {
	range: number
	rangeDialogOpen: boolean
	destinationsDrawerOpen: boolean

	_callbacks: {
		[K in Keys]: Set<(value: State[K]) => void>
	}

	subscribe<T extends Keys>(property: T, callback: (value: State[T]) => void): void

	unsubscribe<T extends Keys>(property: T, callback: (value: State[T]) => void): void
}

declare const state: State
export default state
