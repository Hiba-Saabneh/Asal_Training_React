import React from 'react'
import Nav from './components/Nav/Nav'
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'

function App() {
	return (
		<>
			<div style={{ width: '50%', margin: 'auto', height: '100vh' }}>
				<Nav />
				<Home />
				<Footer />
			</div>
		</>
	)
}

export default App
