import React, { useEffect, useState } from 'react'
import './ColoredBox.css'

const ColoredBox = () => {
	//to give the random color of the colored box
	const getRandomColor = () => {
		// Generate random values for red, green, and blue to give random color in rgb .
		const red = Math.floor(Math.random() * 256)
		const green = Math.floor(Math.random() * 256)
		const blue = Math.floor(Math.random() * 256)

		// Convert the RGB values to a hexadecimal string
		let hexColor = `#${red.toString(16)}${green.toString(16)}${blue.toString(
			16
		)}`

		return hexColor
	}

	//to randomize the colors in thre cloros array
	const shuffleArray = (arrayOfColors: string[]) => {
		return arrayOfColors.sort(() => Math.random() - 0.5)
	}

	// give the color set of buttons randomly
	const getColorSet = (randomColor: string) => {
		let arrayOfColors = [randomColor]
		while (true) {
			let color = getRandomColor()
			if (color !== randomColor && arrayOfColors.length < 3) {
				arrayOfColors.push(color)
			} else {
				break
			}
		}
		return arrayOfColors
	}

	//start new arounds of game
	const startNewGame = () => {
		setEndOFGAme(false)
		setRound(1)
		setallRoundsGuessess([])
		setRandomColor(getRandomColor)
		setArrayOfColors(shuffleArray(getColorSet(randomColor)))
		setWrongRounds([])
	}
	//make new color for coloredBox with new color buttons
	const getNewRound = (guessColor: string) => {
		setallRoundsGuessess((prevGuess) => {
			if (prevGuess.length) {
				return [...prevGuess, round, guessColor]
			}
			return [round, guessColor]
		})

		setWrongRounds((preRound) => {
			let wrongGuess
			if (guessColor !== randomColor) {
				wrongGuess = true
			} else {
				wrongGuess = false
			}

			if (preRound.length) {
				return [...preRound, wrongGuess]
			}
			return [wrongGuess]
		})

		if (round !== 5) {
			setRound(round + 1)
			setRandomColor(getRandomColor)
		} else {
			setEndOFGAme(true)
		}
	}

	const [randomColor, setRandomColor] = useState(getRandomColor)
	const [arrayOfColors, setArrayOfColors] = useState(
		shuffleArray(getColorSet(randomColor))
	)
	const [allRoundsGuessess, setallRoundsGuessess] = useState<
		(string | number)[]
	>([])
	const [round, setRound] = useState(1)
	const [endOfGame, setEndOFGAme] = useState(false)
	const [wrongRounds, setWrongRounds] = useState<boolean[]>([])
	console.log(randomColor)
	console.log(allRoundsGuessess)
	console.log(wrongRounds)

	useEffect(() => {
		setArrayOfColors(shuffleArray(getColorSet(randomColor)))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [randomColor])
	return (
		<>
			<div className={`container `}>
				<div className={`${endOfGame ? 'displayNone' : 'displayBlock'}`}>
					<div className='round'>Round #{round}</div>
					<div
						className='colorBoxCustom'
						style={{ background: randomColor }}
					></div>
					<div className='btns'>
						{arrayOfColors.map((color, index) => (
							<button
								className='colorButton'
								key={index}
								onClick={() => getNewRound(color)}
							>
								{color}
							</button>
						))}
					</div>
				</div>
				<div className={`result ${endOfGame ? 'displayBlock' : 'displayNone'}`}>
					{allRoundsGuessess.length ? (
						<>
							<div className='wrongPart'>
								<h2 className='wrong'>Try guessing again</h2>
								<div className='wrongAnswers'>
									{allRoundsGuessess.map((guess, index) =>
										(index + 1) % 2 !== 0 ? (
											<span key={index}>Round #{guess}: </span>
										) : (
											<>
												<span key={index} className='capetlize'>
													{' '}
													{guess}{' '}
													{wrongRounds[Math.floor(index / 2)]
														? 'is wrong color'
														: 'is correct color'}
												</span>
												<br></br>
											</>
										)
									)}
								</div>
							</div>
						</>
					) : (
						<>
							<h2 className='correct'> All guesses are correct !</h2>
						</>
					)}
					<button className='playAgain' onClick={startNewGame}>
						Play again
					</button>
				</div>
			</div>
		</>
	)
}

export default ColoredBox
