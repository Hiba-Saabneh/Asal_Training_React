import React from 'react'
import './InvertedApp.css'

interface InvertedAppProps {
	paragragh: string
	img: string
}

const InvertedApp = (props: InvertedAppProps) => {
	const { paragragh, img } = props
	return (
		<>
			<img src={img} alt='' width='300px' height='250px' />

			<p>{paragragh}</p>
		</>
	)
}

export default InvertedApp
