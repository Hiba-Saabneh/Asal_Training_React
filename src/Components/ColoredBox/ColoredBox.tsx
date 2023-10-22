import React, { useEffect, useState } from 'react'
import './ColoredBox.css'

const ColoredBox = () => {
	const [randomColor, setRandomColor] = useState(getRandomColor)
	const [arrayOfColors, setArrayOfColors] = useState(
		shuffleArray(getColorSet(randomColor))
	)
	const [wrongGuess, setwrongGuess] = useState<(string | number)[]>([])
	const [round, setRound] = useState(1)
	const [endOfGame, setEndOFGAme] = useState(false)
	console.log(randomColor)
	console.log(wrongGuess)

	//start new arounds of game
	function startNewGame() {
		setEndOFGAme(false)
		setRound(1)
		setwrongGuess([])
		setRandomColor(getRandomColor)
		setArrayOfColors(shuffleArray(getColorSet(randomColor)))
	}
	//make new color for coloredBox with new color buttons
	function getNewRound(guessColor: string) {
		if (guessColor !== randomColor) {
			setwrongGuess((prevGuess) => {
				if (prevGuess.length) {
					return [...prevGuess, round, guessColor]
				}
				return [round, guessColor]
			})
		}
		if (round !== 5) {
			setRound(round + 1)
			setRandomColor(getRandomColor)
		} else {
			setEndOFGAme(true)
		}
	}
	//to randomize the colors in thre cloros array
	function shuffleArray(arrayOfColors: string[]) {
		return arrayOfColors.sort(() => Math.random() - 0.5)
	}

	//to give the random color of the colored box
	function getRandomColor() {
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

	// give the color set of buttons randomly
	function getColorSet(randomColor: string) {
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
					{wrongGuess.length ? (
						<>
							<div className='wrongPart'>
								<h2 className='wrong'>Try guessing again</h2>
								<div className='wrongAnswers'>
									{wrongGuess.map((guess, index) =>
										(index + 1) % 2 !== 0 ? (
											<span key={index}>Round #{guess}: </span>
										) : (
											<>
												<span key={index}> {guess} is wrong color</span>
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
