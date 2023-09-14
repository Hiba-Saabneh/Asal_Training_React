import React from 'react'
import InvertedApp from './components/invertComp/InvertedApp'
import './App.css'

function App() {
	const paragragh =
		'	Lorem ipsum dolor sit amet consectetur adipisicing elit. Id debitis, quos, facilis natus temporibus accusantium et fugiat labore at nihil eius recusandae illo similique provident mollitia nam quod eos nisi quae doloribus eaque ipsa minus! Tenetur quod sint sed veniam omnis quam minima, maxime optio delectus modi officiis quibusdam fugit!'
	const img = 'img/Image20230913120206.png'

	function displayOppositeComponents(n: number) {
		let components = Array.from({ length: n }, (_, index) => (
			<InvertedApp key={index} paragragh={paragragh} img={img} />
		))

		return components
	}

	return (
		<>
			{displayOppositeComponents(5).map((e, index) => (
				<div
					className='parentDiv'
					style={{
						flexDirection: (index + 1) % 2 == 0 ? 'row-reverse' : 'row',
					}}
				>
					{e}
				</div>
			))}
		</>
	)
}

export default App
