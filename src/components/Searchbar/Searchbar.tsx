import React, { useState } from 'react'
import '../WatchList/WatchList.module.css'

interface SearchbarProps {
	searchMovie: (value: string) => void
}
const Searchbar = (props: SearchbarProps) => {
	const { searchMovie } = props
	const [Movie, setMovie] = useState('')
	const search = (ele: React.ChangeEvent<HTMLInputElement>) => {
		const value = ele.target.value
		setMovie(value)
		searchMovie(value)
		console.log(searchMovie)
	}
	return (
		<div>
			<input
				type='text'
				placeholder='search'
				onChange={(e) => search(e)}
				value={Movie}
			/>
		</div>
	)
}

export default Searchbar
