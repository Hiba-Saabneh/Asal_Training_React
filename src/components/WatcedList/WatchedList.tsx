import React, { Dispatch, SetStateAction, useEffect } from 'react'
import styles from '../WatchList/WatchList.module.css'

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
	removMovie: (id: string) => void
}

const WatchedList = (props: WatchedListProps) => {
	const { watchedMovie, setwatchedCount, watchedCount, removMovie } = props

	return (
		<div>
			{watchedMovie.map(
				(ele, index) =>
					index < watchedCount && (
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
									onClick={() => removMovie(ele.id)}
								>
									remove{' '}
								</button>
							</div>
						</div>
					)
			)}
			<h3
				style={{ display: watchedMovie.length >= 10 ? 'block' : 'none' }}
				onClick={() => setwatchedCount((e) => e + 10)}
			>
				Show more
			</h3>
		</div>
	)
}

export default WatchedList
