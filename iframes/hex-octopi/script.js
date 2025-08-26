const d = document
d.gebi = d.getElementById
const w = window

const hexAni = d.gebi('hexAni')
const spiralAni = d.gebi('spiralAni')

function getLesserDistance(height, width) {
	if (height < width) {
		return height
	} else {
		return width
	}
}

function scaleHexAni () {
	let windowWidth = w.innerWidth
	let windowHeight = w.innerHeight

	let lesserDistance = getLesserDistance(windowHeight, windowWidth)
	let currentRatio = lesserDistance / hexAni.getBoundingClientRect().height
	let scaleAmount = currentRatio * 0.6

	hexAni.style.transform = `translateX(-50%) translateY(calc(-50%)) scale(${scaleAmount}, ${scaleAmount})`
}

scaleHexAni()

let lastWindowSize = null
let currentWindowSize = null

w.onresize = function () {
	let windowWidth = w.innerWidth
	let windowHeight = w.innerHeight

	lastWindowSize = currentWindowSize
	currentWindowSize = getLesserDistance(windowHeight, windowWidth)
	
	let delayedCurrentWindowSize = currentWindowSize

	w.setTimeout(function() {
		if (delayedCurrentWindowSize === getLesserDistance(windowHeight, windowWidth)) {
			scaleHexAni()
		}
	}, 50)
}