import React, { useState, useEffect } from 'react'
import './App.css'
import WatchList from './components/WatchList/WatchList'
import WatchedList from './components/WatcedList/WatchedList'
import Searchbar from './components/Searchbar/Searchbar'

function App() {
	interface Post {
		id: string
		title: string
		poster: string
		overview: string
		release_date: number
		genres: []
	}

	const [posts, setPosts] = useState<Post[]>([])
	const [watchedMovie, setWatchedMovie] = useState<Post[]>([])
	const [watchCount, setWatchCount] = useState(10)
	const [watchedCount, setWatchedCount] = useState(10)
	const [movieName, setMovieName] = useState('')

	const removMovie = (ele: Post) => {
		setWatchedMovie((e) => e.filter((p) => p.id !== ele.id))
		setPosts((prevPosts) => [ele, ...prevPosts])
	}

	useEffect(() => {
		const getPosts = async () => {
			const response = await fetch(
				'https://mocki.io/v1/26cead06-d092-41d0-9317-d964faa232ee'
			)

			const responseData = await response.json()
			setPosts(responseData)
		}

		getPosts()
	}, [])

	const searchMovie = (value: string) => {
		const Smovie = value.toLowerCase()
		setMovieName(Smovie)
	}

	const ShowWatchList = () => {
		if (movieName === '') {
			return posts
		}
		return posts.filter((post) => post.title.toLowerCase().includes(movieName))
	}
	const ShowWatchedList = () => {
		if (movieName === '') {
			return watchedMovie
		}
		return watchedMovie.filter((post) =>
			post.title.toLowerCase().includes(movieName)
		)
	}

	return (
		<>
			<div className='search'>
				<Searchbar searchMovie={searchMovie} />
			</div>
			<div className='container'>
				<div className='leftSide'>
					<h2>Watch list</h2>
					<WatchList
						posts={ShowWatchList()}
						count={watchCount}
						watchedMovie={watchedMovie}
						setWatchedMovie={setWatchedMovie}
						seCount={setWatchCount}
						setPosts={setPosts}
					/>
				</div>
				<div className='rightSide'>
					<h2>Watched list</h2>
					<WatchedList
						watchedMovie={ShowWatchedList()}
						watchedCount={watchedCount}
						setwatchedCount={setWatchedCount}
						removMovie={removMovie}
					/>
				</div>
			</div>
		</>
	)
}

export default App
