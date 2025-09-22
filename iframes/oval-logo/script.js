d = document
d.gebi = d.getElementById

logoContainer = d.gebi('logoContainer')

function getSmallerWidthOrHeight() {
	if (window.innerHeight <= window.innerWidth) {
		return 'vh'
	} else {
		return 'vw'
	}
}

function setSize() {
	swh = getSmallerWidthOrHeight()

	logoContainer.style.width = `80${swh}`
	logoContainer.style.height = `80${swh}`
}

setSize()

window.onresize = setSize