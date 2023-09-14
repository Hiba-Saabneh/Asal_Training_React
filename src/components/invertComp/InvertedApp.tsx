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

			<p style={{ width: '300px', border: '1px solid black' }}>{paragragh}</p>
		</>
	)
}

export default InvertedApp
