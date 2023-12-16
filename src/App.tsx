import React from 'react'
import InvertedApp from './components/invertComp/InvertedApp'

function App() {
	let para =
		'	Lorem ipsum dolor sit amet consectetur adipisicing elit. Id debitis, quos, facilis natus temporibus accusantium et fugiat labore at nihil eius recusandae illo similique provident mollitia nam quod eos nisi quae doloribus eaque ipsa minus! Tenetur quod sint sed veniam omnis quam minima, maxime optio delectus modi officiis quibusdam fugit!'
	let img = 'img/Image20230913120206.png'

	return (
		<>
			<InvertedApp parag={para} img={img} test={true} />

			<InvertedApp parag={para} img={img} test={false} />

			<InvertedApp parag={para} img={img} test={true} />
		</>
	)
}

export default App
