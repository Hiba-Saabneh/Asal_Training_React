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

	//search based on title of movie
	const searchMovie = (MovieTitleLetters: string) => {
		setMovieName(MovieTitleLetters)
	}

	// add movies to watchedlist
	const AddOrRemove = (AddMovieOrRemove: Post, Add: boolean) => {
		if (Add) {
			setWatchedMovie((prevWatchedMovie) => {
				const isAlreadyWatched = prevWatchedMovie.some(
					(movieElement) => movieElement.id === AddMovieOrRemove.id
				)

				if (!isAlreadyWatched) {
					return [...prevWatchedMovie, AddMovieOrRemove]
				}

				return prevWatchedMovie
			})
			setPosts((prevPosts) => {
				const newPosts = prevPosts.filter(
					(postElement) => postElement.id !== AddMovieOrRemove.id
				)
				return [...newPosts]
			})
		} else {
			setWatchedMovie((movie) =>
				movie.filter((post) => post.id !== AddMovieOrRemove.id)
			)
			setPosts((prevPosts) => [AddMovieOrRemove, ...prevPosts])
		}
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

	return (
		<>
			<div className='search'>
				<Searchbar searchMovie={searchMovie} />
			</div>
			<div className='container'>
				<div className='leftSide'>
					<h2>Watch list</h2>
					<MovieList
						AddOrRemove={AddOrRemove}
						movies={posts.filter((post) =>
							post.title.toLowerCase().includes(movieName.toLowerCase())
						)}
						postersCount={watchCount}
						setPostersCount={setWatchCount}
						isWatched={false}
					/>
				</div>
				<div className='rightSide'>
					<h2>Watched list</h2>
					<MovieList
						AddOrRemove={AddOrRemove}
						movies={watchedMovie.filter((post) =>
							post.title.toLowerCase().includes(movieName.toLowerCase())
						)}
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
