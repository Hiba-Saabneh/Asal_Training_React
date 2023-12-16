import React from 'react'
import style from './InvertedApp.module.css'

interface InvertedAppProps {
	parag: string
	img: string
	test: boolean
}

export default function InvertedApp(props: InvertedAppProps) {
	const { parag, img, test } = props
	return (
		<div className={style.inv}>
			<img
				src={img}
				alt=''
				width='300px'
				height='250px'
				style={{ order: test ? '0' : '1' }}
			/>

			<p style={{ width: '300px', border: '1px solid black' }}>{parag}</p>
		</div>
	)
}
