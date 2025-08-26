d = document
d.ce = d.createElement
d.gebi = d.getElementById

animationContainer = d.gebi('animationContainer')

createItems()

function createItems () {
	for (var i = 0; i < 600; i++) {
		item = d.ce('div')
		item.id = `item${i}`
		item.classList.add('item')
		item.classList.add('move-and-flicker')
		item.style.animationDuration = 1 + 's'
		item.style.animationDelay = '-' + (i * 0.01) + 's'
		animationContainer.appendChild(item)
	}
}