import React, { useEffect, useState, useRef } from 'react'
import './Dropdown.css'
import { menuItems } from '.././Items/Items'

interface Items {
	value: string
	text: string
}
const Dropdown = () => {
	const [showDropdownList, setShowDropDownList] = useState(true)
	const [inputvalue, setInputValue] = useState('')
	const [itemsThatShowsinDropDownList, setItemsThatShowsinDropDownList] =
		useState<Items[]>(menuItems)
	const [selectedItemIndex, setSelectedItemIndex] = useState(-1)
	const dropdownListRef = useRef<HTMLUListElement>(null)

	//function that visible dropdown list when click in search bar
	const dropDownListVisibilty = () => {
		setShowDropDownList(!showDropdownList)
	}
	//function to select input value when click on list Item and the hide the dropdown list after select an item
	const selectInput = (menuItem: Items) => {
		setInputValue(menuItem.value)
		setShowDropDownList(true)
	}
	// Function that scrolls to the selected item
	const scrollToSelectedItem = () => {
		if (selectedItemIndex >= 0 && dropdownListRef.current) {
			const item = dropdownListRef.current.childNodes[selectedItemIndex]

			if (item instanceof HTMLElement) {
				item.scrollIntoView({
					behavior: 'auto',
					block: 'center',
				})
			}
		}
	}

	// Function that selects an item and scrolls to it
	const selectItem = (index: number) => {
		setSelectedItemIndex(index)
		scrollToSelectedItem()
	}
	//use keyboard to select an item from dropdown list
	useEffect(() => {
		const handleWheel = (e: WheelEvent) => {
			//ensure that the dropdown list is not null in if condition
			if (dropdownListRef.current) {
				// Calculate the new scrollTop value based on wheel delta
				let newScrollTop = dropdownListRef.current.scrollTop + e.deltaY
				dropdownListRef.current.scrollTop = newScrollTop
			}
		}
		//make event handeler when press keyboard
		const handleKeyDown = (e: KeyboardEvent) => {
			if (
				e.key === 'ArrowDown' &&
				selectedItemIndex < itemsThatShowsinDropDownList.length - 1
			) {
				selectItem(selectedItemIndex + 1)
				console.log('the index of the item arrowDOwn' + selectedItemIndex)
			} else if (e.key === 'ArrowUp' && selectedItemIndex > 0) {
				selectItem(selectedItemIndex - 1)
				console.log('the index of the item arrow up' + selectedItemIndex)
			} else if (e.key === 'Enter' && selectedItemIndex >= 0) {
				console.log('the index of the item enter' + selectedItemIndex)
				selectInput(itemsThatShowsinDropDownList[selectedItemIndex])
			} else if (e.key === 'Escape') {
				//to close dropDownlist
				console.log('the index of the item esc')
				setShowDropDownList(true)
			}
		}
		if (showDropdownList === false) {
			console.log(selectedItemIndex)
			document.addEventListener('keydown', handleKeyDown)
			document.addEventListener('wheel', handleWheel as EventListener)
		} else {
			setSelectedItemIndex(-1)
		}
		//in this line we remove the event listener for repeated execution line issuses make Cleanup when the func  is unamount
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
			document.removeEventListener('wheel', handleWheel as EventListener)
		}
	}, [showDropdownList, selectedItemIndex])

	// return items that fit of input value just when we make changes in input value
	useEffect(() => {
		setItemsThatShowsinDropDownList((prevMenuItems) => {
			if (inputvalue === '') return menuItems
			else {
				return menuItems.filter(
					(items) =>
						items.text.toLowerCase().includes(inputvalue.toLowerCase()) ||
						items.value.toLowerCase().includes(inputvalue.toLowerCase())
				)
			}
		})
	}, [inputvalue])
	return (
		<>
			<div className='dropdown' onClick={dropDownListVisibilty}>
				<input
					type='text'
					value={inputvalue}
					onChange={(event) => setInputValue(event.target.value)}
				/>
				<i className='fa-solid fa-angle-down'></i>
			</div>
			<ul
				ref={dropdownListRef}
				style={{
					display: showDropdownList ? 'none' : 'block',
					height:
						itemsThatShowsinDropDownList.length < 5
							? itemsThatShowsinDropDownList.length == 0
								? '5vh'
								: `${itemsThatShowsinDropDownList.length * 6}vh`
							: '25vh',
				}}
				className='dropdown_list'
			>
				{itemsThatShowsinDropDownList.length > 0 ? (
					itemsThatShowsinDropDownList.map((menuItem, index) => (
						<li
							onClick={() => selectInput(menuItem)}
							key={menuItem.value}
							style={{
								background: selectedItemIndex === index ? 'aliceblue' : '',
							}}
						>
							{menuItem.text} ({menuItem.value})
						</li>
					))
				) : (
					<span> not found</span>
				)}
			</ul>
		</>
	)
}

export default Dropdown
