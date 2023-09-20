import React, { Dispatch, SetStateAction, useEffect } from 'react'
import '../WatchList/WatchList.css'

interface Post {
	id: string
	title: string
	poster: string
	overview: string
	release_date: number
	genres: []
}
interface WatchedListProps {
	watchedMovie: Post[]
	watchedCount: number
	setwatchedCount: Dispatch<SetStateAction<number>>
	removMovie: (ele: Post) => void
}

const WatchedList = (props: WatchedListProps) => {
	const { watchedMovie, setwatchedCount, watchedCount, removMovie } = props

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
			setwatchedCount((prevCount) => prevCount + 10) // Update setwatchedCount when reaching the end
		}
	}
	return (
		<div>
			{watchedMovie.map(
				(ele, index) =>
					index < watchedCount && (
						<div key={ele.id} className='poster'>
							<img src={ele.poster} alt={ele.title} />
							<div className='info'>
								<p>#({index + 1})</p>
								<h2>{ele.title}</h2>
								<p>{ele.overview}</p>
								{ele.genres.map((gen, index) => (
									<span key={index}>{gen}</span>
								))}
								<button className='btn' onClick={() => removMovie(ele)}>
									remove{' '}
								</button>
							</div>
						</div>
					)
			)}
		</div>
	)
}

export default WatchedList
