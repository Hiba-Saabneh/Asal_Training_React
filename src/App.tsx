import React from 'react'
import InvertedApp from './components/invertComp/InvertedApp'

function App() {
	let paragragh =
		'	Lorem ipsum dolor sit amet consectetur adipisicing elit. Id debitis, quos, facilis natus temporibus accusantium et fugiat labore at nihil eius recusandae illo similique provident mollitia nam quod eos nisi quae doloribus eaque ipsa minus! Tenetur quod sint sed veniam omnis quam minima, maxime optio delectus modi officiis quibusdam fugit!'
	let img = 'img/Image20230913120206.png'
	function displayOppositeComponents(n: number) {
		let components = []
		let content = ''
		let positionFlag = false
		for (var i = 0; i < n; i++) {
			positionFlag = !positionFlag
			components.push(
				<InvertedApp
					key={i}
					paragragh={paragragh}
					img={img}
					positionFlag={positionFlag}
				/>
			)
		}
		return components
	}
	return <>{displayOppositeComponents(5)}</>
}

export default App
