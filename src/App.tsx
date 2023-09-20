import React, { useState, useEffect } from 'react'
import './App.css'
import MovieList from './components/WatchList/MovieList'
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

	// add movies to watchedlist
	const AddToWatchedList = (movieFromWatchtToWatchedList: Post) => {
		setWatchedMovie((prevWatchedMovie) => {
			const isAlreadyWatched = prevWatchedMovie.some(
				(m) => m.id === movieFromWatchtToWatchedList.id
			)

			if (!isAlreadyWatched) {
				return [...prevWatchedMovie, movieFromWatchtToWatchedList]
			}

			return prevWatchedMovie
		})
		setPosts((prevPosts) => {
			const newPosts = prevPosts.filter(
				(p) => p.id !== movieFromWatchtToWatchedList.id
			)
			return [...newPosts]
		})
	}

	// remove the movie from watched list to watch list
	const removMovie = (movieItWillBeRemoved: Post) => {
		setWatchedMovie((e) =>
			e.filter((post) => post.id !== movieItWillBeRemoved.id)
		)
		setPosts((prevPosts) => [movieItWillBeRemoved, ...prevPosts])
	}
	// give data from API
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
	//search based on title of movie
	const searchMovie = (MovieTitleLetters: string) => {
		setMovieName(MovieTitleLetters.toLowerCase())
	}
	//display posters on watch and watched list
	const ShowList = (moviesList: Post[]) => {
		if (movieName === '') {
			return moviesList
		}
		return moviesList.filter((post) =>
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
					<MovieList
						AddToWatchedList={AddToWatchedList}
						removMovie={removMovie}
						posts={ShowList(posts)}
						postersCount={watchCount}
						setPostersCount={setWatchCount}
						isWatched={false}
					/>
				</div>
				<div className='rightSide'>
					<h2>Watched list</h2>
					<MovieList
						AddToWatchedList={AddToWatchedList}
						removMovie={removMovie}
						posts={ShowList(watchedMovie)}
						postersCount={watchedCount}
						setPostersCount={setWatchedCount}
						isWatched={true}
					/>
				</div>
			</div>
		</>
	)
}

export default App
