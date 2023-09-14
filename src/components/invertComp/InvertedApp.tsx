import React from 'react'
import './InvertedApp.css'

const data = [
	{
		paragragh:
			'	Lorem ipsum dolor sit amet consectetur adipisicing elit. Id debitis, quos, facilis natus temporibus accusantium et fugiat labore at nihil eius recusandae illo similique provident mollitia nam quod eos nisi quae doloribus eaque ipsa minus! Tenetur quod sint sed veniam omnis quam minima, maxime optio delectus modi officiis quibusdam fugit!',
		img: 'img/Image20230913120206.png',
	},
	{
		paragragh:
			'	Lorem ipsum dolor sit amet consectetur adipisicing elit. Id debitis, quos, facilis natus temporibus accusantium et fugiat labore at nihil eius recusandae illo similique provident mollitia nam quod eos nisi quae doloribus eaque ipsa minus! Tenetur quod sint sed veniam omnis quam minima, maxime optio delectus modi officiis quibusdam fugit!',
		img: 'img/Image20230913120206.png',
	},
	{
		paragragh:
			'	Lorem ipsum dolor sit amet consectetur adipisicing elit. Id debitis, quos, facilis natus temporibus accusantium et fugiat labore at nihil eius recusandae illo similique provident mollitia nam quod eos nisi quae doloribus eaque ipsa minus! Tenetur quod sint sed veniam omnis quam minima, maxime optio delectus modi officiis quibusdam fugit!',
		img: 'img/Image20230913120206.png',
	},
	{
		paragragh:
			'	Lorem ipsum dolor sit amet consectetur adipisicing elit. Id debitis, quos, facilis natus temporibus accusantium et fugiat labore at nihil eius recusandae illo similique provident mollitia nam quod eos nisi quae doloribus eaque ipsa minus! Tenetur quod sint sed veniam omnis quam minima, maxime optio delectus modi officiis quibusdam fugit!',
		img: 'img/Image20230913120206.png',
	},
]

const InvertedApp = () => {
	return data.map((item) => (
		<div className='container'>
			<img src={item.img} className='data-image' />
			<p className='data-parag'>{item.paragragh}</p>
		</div>
	))
}

export default InvertedApp
