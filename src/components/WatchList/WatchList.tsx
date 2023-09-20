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
	count: number
	seCount: Dispatch<SetStateAction<number>>
	watchedMovie: Post[]
	setWatchedMovie: Dispatch<SetStateAction<Post[]>>
	setPosts: Dispatch<SetStateAction<Post[]>>
}
const WatchList = (props: WatchListProps) => {
	const { posts, count, seCount, watchedMovie, setWatchedMovie, setPosts } =
		props

	const AddToWatchedList = (ele: Post) => {
		setWatchedMovie((prevWatchedMovie) => {
			const isAlreadyWatched = prevWatchedMovie.some((m) => m.id === ele.id)

			if (!isAlreadyWatched) {
				return [...prevWatchedMovie, ele]
			}

			return prevWatchedMovie
		})
		setPosts((prevPosts) => {
			const newPosts = prevPosts.filter((p) => p.id !== ele.id)
			return [...newPosts]
		})
	}

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
			seCount((prevCount) => prevCount + 10) // Update seCount when reaching the end
		}
	}

	return (
		<>
			<div>
				{posts.map(
					(ele, index) =>
						index < count && (
							<div key={ele.id} className='poster'>
								<img src={ele.poster} alt={ele.title} />
								<div className='info'>
									<p>#({index + 1})</p>
									<h2>{ele.title}</h2>
									<p>{ele.overview}</p>
									{ele.genres.map((gen, index) => (
										<span key={index}>{gen}</span>
									))}
									<button className='btn' onClick={() => AddToWatchedList(ele)}>
										add to Watched list
									</button>
								</div>
							</div>
						)
				)}
			</div>
		</>
	)
}

export default WatchList
