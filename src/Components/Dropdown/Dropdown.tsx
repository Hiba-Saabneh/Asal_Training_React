import React, { useEffect, useState } from 'react'
import './Dropdown.css'
import { menuItems } from '../Items/Items'

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

	//function that visible dropdown list when click in search bar
	const dropDownListVisibilty = () => {
		if (selectedItemIndex < 0) {
			setShowDropDownList(!showDropdownList)
			if (!showDropdownList) {
				document.getElementById('dropdownMenu_input')?.blur()
			} else {
				document.getElementById('dropdownMenu_input')?.focus()
			}
		}
	}

	//function to select input value when click on list Item and the hide the dropdown list after select an item
	const selectInput = (menuItem: Items) => {
		setInputValue(menuItem.value)
		// setShowDropDownList(true)
		document.getElementById('dropdownMenu_input')?.focus()
	}

	// Function that scrolls to the selected item
	const scrollToSelectedItem = (index: number) => {
		let ElemntToFocus = document.getElementById(`#${index}`)
		if (ElemntToFocus) {
			ElemntToFocus.focus()
			ElemntToFocus.scrollIntoView({ behavior: 'auto', block: 'center' })
		}
	}

	//use keyboard to select an item from dropdown list
	useEffect(() => {
		// Function that selects an item and scrolls to it
		const selectItem = (index: number) => {
			setSelectedItemIndex(index)
			scrollToSelectedItem(index)
		}
		//make event handeler when press keyboard
		const handleKeyDown = (e: KeyboardEvent) => {
			const dropdownMenu_input = document.getElementById('dropdownMenu_input')
			if (
				e.key === 'ArrowDown' &&
				selectedItemIndex <= itemsThatShowsinDropDownList.length - 1
			) {
				dropdownMenu_input?.blur()
				if (selectedItemIndex === itemsThatShowsinDropDownList.length - 1) {
					selectItem(0)
					console.log('arrive to last element')
				} else {
					selectItem(selectedItemIndex + 1)
				}

				console.log('the index of the item arrowDOwn' + selectedItemIndex)
			} else if (e.key === 'ArrowUp' && selectedItemIndex > 0) {
				dropdownMenu_input?.blur()
				selectItem(selectedItemIndex - 1)
				console.log('the index of the item arrow up' + selectedItemIndex)
			} else if (e.key === 'Enter' && selectedItemIndex >= 0) {
				console.log('the index of the item enter' + selectedItemIndex)
				selectInput(itemsThatShowsinDropDownList[selectedItemIndex])
				setSelectedItemIndex(-1)
			} else if (e.key === 'Escape') {
				//to close dropDownlist
				console.log('the index of the item esc')
				setShowDropDownList(true)
			}
		}
		if (showDropdownList === false) {
			console.log(selectedItemIndex)
			document.addEventListener('keydown', handleKeyDown)
		}
		//in this line we remove the event listener for repeated execution line issuses make Cleanup when the func  is unmount
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [showDropdownList, selectedItemIndex, itemsThatShowsinDropDownList])

	// return items that fit of input value just when we make changes in input value
	const search = (value: string) => {
		setItemsThatShowsinDropDownList((prevMenuItems) => {
			if (value === '') return menuItems
			else {
				return menuItems.filter(
					(items) =>
						items.text.toLowerCase().includes(value.toLowerCase()) ||
						items.value.toLowerCase().includes(value.toLowerCase())
				)
			}
		})
	}

	return (
		<>
			<div className='dropdown'>
				<input
					id='dropdownMenu_input'
					type='text'
					value={inputvalue}
					onChange={(event) => {
						setInputValue(event.target.value)
						setShowDropDownList(false)
						setSelectedItemIndex(-1)
						search(event.target.value)
					}}
					onClick={dropDownListVisibilty}
				/>
				<i
					className='fa-solid fa-angle-down'
					onClick={() => {
						setShowDropDownList(!showDropdownList)
						setSelectedItemIndex(-1)
					}}
				></i>
			</div>
			<ul
				style={{
					display: showDropdownList ? 'none' : 'block',
				}}
				className='dropdown_list'
			>
				{itemsThatShowsinDropDownList.length ? (
					itemsThatShowsinDropDownList.map((menuItem, index) => (
						<li
							onClick={() => selectInput(menuItem)}
							key={index}
							style={{
								background: selectedItemIndex === index ? 'aliceblue' : '',
							}}
							id={`#${index}`}
						>
							{menuItem.text} ({menuItem.value})
						</li>
					))
				) : (
					<span>not found</span>
				)}
			</ul>
		</>
	)
}

export default Dropdown
