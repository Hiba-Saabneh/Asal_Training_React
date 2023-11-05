import React from 'react'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'

function App() {
	const state = useSelector((state: { value: number }) => {
		if (state.value < 0) return 'no num'
		return state.value
	})

	const dispatch = useDispatch()

	const increase = () => {
		const action = { type: 'increase' }
		dispatch(action)
	}

	return (
		<>
			<div className='increaseCounter'>
				<h1>counter={state} </h1>
				<button onClick={increase}>increase++</button>
			</div>
		</>
	)
}

export default App
