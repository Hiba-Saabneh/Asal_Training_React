import React from 'react'
import './InvertedApp.css'

interface InvertedAppProps {
	paragragh: string
	img: string
	positionFlag: boolean
}

export default function InvertedApp(props: InvertedAppProps) {
	const { paragragh, img, positionFlag } = props
	const OrderStyle = { order: positionFlag ? '0' : '1' }
	return (
		<div className='InvertedComponent'>
			<img src={img} alt='' width='300px' height='250px' style={OrderStyle} />

			<p style={{ width: '300px', border: '1px solid black' }}>{paragragh}</p>
		</div>
	)
}
