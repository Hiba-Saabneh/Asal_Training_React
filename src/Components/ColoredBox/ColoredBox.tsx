import React, { useState, useEffect } from 'react'
import './ColoredBox.css'

const ColoredBox = () => {
	const buttonColors = ['red', 'blue', 'green']
	const guessesColored = ['red', 'red', 'red', 'green', 'blue']
	const [colorsThatUserChoose, setColorsThatUserChoose] = useState<string[]>([])
	const [round, setRound] = useState<number>(1)
	const [endOfGame, setEndOfGame] = useState(false)
	const resetGame = () => {
		setRound(1)
		setColorsThatUserChoose([])
		setEndOfGame(false)
	}
	const resultOfGame = (ColorsArray: string[]) => {
		let labelElement = document.getElementById('header')
		let WrongGuessRound: number[] = []
		guessesColored.map((guesscolor, index) => {
			if (guesscolor !== ColorsArray[index]) WrongGuessRound.push(index + 1)
		})
		if (WrongGuessRound.length === 0 && labelElement) {
			labelElement.innerHTML =
				'<h1 class="correct">All guesses are correct &#9989;<h1>'
			setEndOfGame(true)
		} else {
			if (labelElement)
				labelElement.innerHTML = `<h1>Try guessing again at round/s : </h1>
                <div class='wrongRounds'>
                ${WrongGuessRound.map(
									(rounded, index) =>
										`<div key=${index}>${rounded} &#10060; </div>`
								)} <div>`
			setEndOfGame(true)
		}
	}

	const rightOrWrongGuess = (color: string) => {
		let ColorsArray = [...colorsThatUserChoose, color]
		setColorsThatUserChoose([...colorsThatUserChoose, color])
		if (round < 5) {
			setRound(round + 1)
		} else {
			resultOfGame(ColorsArray)
		}
	}

	return (
		<div>
			<div className={`header ${endOfGame ? 'hide' : 'show'}`}>
				<h1>Round #{round}</h1>
			</div>
			<div
				className={`header ${endOfGame ? 'header1' : 'header2'} ${
					!endOfGame ? 'hide' : 'show'
				}`}
				id='header'
			>
				{endOfGame && (
					<div className='btnHeader'>
						<button className='tryBtn' onClick={resetGame}>
							try again
						</button>
					</div>
				)}
			</div>
			<div className={endOfGame ? 'hide' : 'show'}>
				<div className='colorBox'>Guess the correct color of the box</div>
				<div className='btnsSpace'>
					{buttonColors.map((color, index) => (
						<button
							className='btns'
							key={index}
							onClick={() => rightOrWrongGuess(color)}
						>
							{color}
						</button>
					))}
				</div>
			</div>
		</div>
	)
}

export default ColoredBox
