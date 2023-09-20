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
	posts: Post[]
	postersCount: number
	setPostersCount: Dispatch<SetStateAction<number>>
	isWatched: boolean
	AddToWatchedList: (movieFromWatchtToWatchedList: Post) => void
	removMovie: (movieFromWatchtToWatchedList: Post) => void
}
const MovieList = (props: WatchListProps) => {
	const {
		posts,
		postersCount,
		setPostersCount,
		isWatched,
		AddToWatchedList,
		removMovie,
	} = props

	useEffect(() => {
		// Add a scroll event listener
		window.addEventListener('scroll', handleScroll)
		return () => {
			// Remove the scroll event listener when the component unmounts
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

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

	return (
		<>
			<div>
				{posts.map(
					(ele, index) =>
						index < postersCount && (
							<div key={ele.id} className='poster'>
								<img src={ele.poster} alt={ele.title} />
								<div className='info'>
									<p>#({index + 1})</p>
									<h2>{ele.title}</h2>
									<p>{ele.overview}</p>
									{ele.genres.map((gen, index) => (
										<span key={index}>{gen}</span>
									))}
									<button
										className='btn'
										onClick={
											!isWatched
												? () => AddToWatchedList(ele)
												: () => removMovie(ele)
										}
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
