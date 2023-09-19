import React, { Dispatch, SetStateAction, useEffect } from 'react'
import styles from './WatchList.module.css'
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
}
const WatchList = (props: WatchListProps) => {
	const { posts, count, seCount, watchedMovie, setWatchedMovie } = props

	const AddToWatchedList = (ele: Post) => {
		setWatchedMovie((prevWatchedMovie) => {
			const isAlreadyWatched = prevWatchedMovie.some((m) => m.id === ele.id)

			if (!isAlreadyWatched) {
				return [...prevWatchedMovie, ele]
			}

			return prevWatchedMovie
		})
	}

	return (
		<>
			{posts.map(
				(ele, index) =>
					index < count && (
						<div key={ele.id} className={styles.poster}>
							<img src={ele.poster} alt={ele.title} />
							<div className={styles.info}>
								<p>#({index + 1})</p>
								<h2>{ele.title}</h2>
								<p>{ele.overview}</p>
								{ele.genres.map((gen, index) => (
									<span key={index}>{gen}</span>
								))}
								<button
									className={styles.btn}
									onClick={() => AddToWatchedList(ele)}
								>
									add to Watched list
								</button>
							</div>
						</div>
					)
			)}
			<h3
				style={{ display: posts.length >= 10 ? 'block' : 'none' }}
				onClick={() => seCount((e) => e + 10)}
			>
				Show more{' '}
			</h3>
		</>
	)
}

export default WatchList
