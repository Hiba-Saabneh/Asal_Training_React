import React, { Dispatch, SetStateAction, useEffect } from 'react'
import './WatchList.css'
interface Post {
	id: string
	title: string
	poster: string
	overview: string
	release_date: number
	genres: []
}
interface WatchListProps {
	movies: Post[]
	postersCount: number
	setPostersCount: Dispatch<SetStateAction<number>>
	isWatched: boolean
	AddOrRemove: (AddMovieOrRemove: Post, Add: boolean) => void
	movieName: string
}
const MovieList = (props: WatchListProps) => {
	const {
		movies,
		postersCount,
		setPostersCount,
		isWatched,
		AddOrRemove,
		movieName,
	} = props

	const handleScroll = () => {
		const windowHeight = window.innerHeight
		const documentHeight = document.documentElement.scrollHeight
		const scrollTop = window.scrollY

		// Check if the user has scrolled to the end of the content
		if (windowHeight + scrollTop >= documentHeight - 100) {
			// You can adjust the 100 value for a more accurate trigger point
			setPostersCount((prevCount) => prevCount + 10) // Update seCount when reaching the end
		}
	}
	useEffect(() => {
		// Add a scroll event listener
		window.addEventListener('scroll', handleScroll)
	}, [])

	return (
		<>
			<div>
				{movies
					.filter((post) =>
						post.title.toLowerCase().includes(movieName.toLowerCase())
					)
					.map(
						(poster, index) =>
							index < postersCount && (
								<div key={poster.id} className='poster'>
									<img src={poster.poster} alt={poster.title} />
									<div className='info'>
										<p>#({index + 1})</p>
										<h2>{poster.title}</h2>
										<p>{poster.overview}</p>
										{poster.genres.map((gen, index) => (
											<span key={index}>{gen}</span>
										))}
										<button
											className='btn'
											onClick={() => AddOrRemove(poster, !isWatched)}
										>
											{!isWatched ? 'add to watched ' : 'remove'}
										</button>
									</div>
								</div>
							)
					)}
			</div>
		</>
	)
}

export default MovieList
