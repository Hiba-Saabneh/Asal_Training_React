import { createStore } from 'redux'

const initState = { value: 0 }
const counterReducer = (state = initState, action) => {
	if (action.type === 'increase') return { value: state.value + 1 }
	return state
}

const store = createStore(counterReducer)
export default store
