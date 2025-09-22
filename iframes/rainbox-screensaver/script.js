d = document
d.ce = d.createElement
d.gebi = d.getElementById
b = d.body
w = window

newElementSizeMin = 20
newElementSizeMax = 70
newElementSize = 20
newElementExpansion = 'grow'

newElementSpeedMin = 5
newElementSpeedMax = 20
newElementSpeedDirection = 'faster'
newElementSpeedIncrement = 0.05

newElementSpeedX = 10
newElementSpeedY = 10

newElementAnimationDurationMin = 4
newElementAnimationDurationMax = 10
newElementAnimationDuration = 7
newElementAnimationDurationDirection = null

newElementPosX = 10
newElementPosY = 10

nextElementLeftBound = null
nextElementRightBound = null
nextElementTopBound = null
nextElementBottomBound = null

newElementDirectionX = 'right'
newElementDirectionY = 'down'

function setNewSpeedDirection () {
	if (Math.random() > 0.5) {
		newElementSpeedDirection = 'faster'
	} else {
		newElementSpeedDirection = 'slower'
	}
}

function setNextElementExpansion () {
	if (newElementExpansion == 'grow') {
		if ((newElementSize + 1) > newElementSizeMax) {
			newElementExpansion = 'shrink'
		}
	} else if (newElementExpansion == 'shrink') {
		if ((newElementSize - 1) < newElementSizeMin) {
			newElementExpansion = 'grow'
		}
	}
}

function getNextRightBound() {
	var elRightBound = newElementPosX + newElementSpeedX + newElementSize + 20

	if (elRightBound >= w.innerWidth) {
		return 'left'
	}
}

function getNextLeftBound() {
	var elRightBound = newElementPosX - newElementSpeedX - 20

	if (elRightBound <= 0) {
		return 'right'
	}
}

function getNextBottomBound() {
	var elBottomBound = newElementPosY + newElementSpeedY + newElementSize + 20

	if (elBottomBound >= w.innerHeight) {
		return 'up'
	}
}

function getNextTopBound() {
	var elTopBound = newElementPosY - newElementSpeedY - 20

	if (elTopBound <= 0) {
		return 'down'
	}
}

function spawnElement () {
	var newElement = d.ce('div')
	newElement.classList.add('new-element')

	// console.log('posX:', newElementPosX, 'posY:', newElementPosY)

	newElement.style.width = `${newElementSize}px`
	newElement.style.height = `${newElementSize}px`

	if (newElementDirectionX == 'right') {
		if (getNextRightBound() == 'left') {
			newElementDirectionX = 'left'
		}
	}

	if (newElementDirectionX == 'left') {
		if (getNextLeftBound() == 'right') {
			newElementDirectionX = 'right'
		}
	}

	if (newElementDirectionX == 'right') {
		newElementPosX = newElementPosX + newElementSpeedX

		if (newElementSpeedDirection == 'faster' && newElementSpeedX < newElementSpeedMax) {
			newElementSpeedX += newElementSpeedIncrement
		} else {
			newElementSpeedDirection = 'slower'
			newElementSpeedX -= newElementSpeedIncrement
		} 

		if (newElementSpeedDirection == 'slower' && newElementSpeedX > newElementSpeedMin) {
			newElementSpeedX -= newElementSpeedIncrement
		} else {
			newElementSpeedDirection = 'faster'
			newElementSpeedX += newElementSpeedIncrement
		}
	} else {
		newElementPosX = newElementPosX - newElementSpeedX

		if (newElementSpeedDirection == 'faster' && newElementSpeedX < newElementSpeedMax) {
			newElementSpeedX += newElementSpeedIncrement
		} else {
			newElementSpeedDirection = 'slower'
			newElementSpeedX -= newElementSpeedIncrement
		} 

		if (newElementSpeedDirection == 'slower' && newElementSpeedX > newElementSpeedMin) {
			newElementSpeedX -= newElementSpeedIncrement
		} else {
			newElementSpeedDirection = 'faster'
			newElementSpeedX += newElementSpeedIncrement
		}
	}

	newElement.style.left = `${newElementPosX}px`

	if (newElementDirectionY == 'down') {
		if (getNextBottomBound() == 'up') {
			newElementDirectionY = 'up'
		}
	}

	if (newElementDirectionY == 'up') {
		if (getNextTopBound() == 'down') {
			newElementDirectionY = 'down'
		}
	}

	if (newElementDirectionY == 'down') {
		newElementPosY = newElementPosY + newElementSpeedY

		if (newElementSpeedDirection == 'faster' && newElementSpeedY < newElementSpeedMax) {
			newElementSpeedY += newElementSpeedIncrement
		} else {
			newElementSpeedDirection = 'slower'
			newElementSpeedY -= newElementSpeedIncrement
		} 

		if (newElementSpeedDirection == 'slower' && newElementSpeedY > newElementSpeedMin) {
			newElementSpeedY -= newElementSpeedIncrement
		} else {
			newElementSpeedDirection = 'faster'
			newElementSpeedY += newElementSpeedIncrement
		}
	} else {
		newElementPosY = newElementPosY - newElementSpeedY

		if (newElementSpeedDirection == 'faster' && newElementSpeedY < newElementSpeedMax) {
			newElementSpeedY += newElementSpeedIncrement
		} else {
			newElementSpeedDirection = 'slower'
			newElementSpeedY -= newElementSpeedIncrement
		} 

		if (newElementSpeedDirection == 'slower' && newElementSpeedY > newElementSpeedMin) {
			newElementSpeedY -= newElementSpeedIncrement
		} else {
			newElementSpeedDirection = 'faster'
			newElementSpeedY += newElementSpeedIncrement
		}
	}

	newElement.style.top = `${newElementPosY}px`

	newElement.style.animationDuration = newElementAnimationDuration + 's'

	setNextElementExpansion()

	if (newElementExpansion == 'grow') {
		newElementSize++
	} else {
		newElementSize--
	}

	b.appendChild(newElement)

	w.setTimeout(function() {
		newElement.remove()
	}, newElementAnimationDuration * 1000)
}

// spawnElement()

w.setInterval(function() {
	spawnElement()
}, 200)