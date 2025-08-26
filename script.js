// Caching DOM document, body, and window - along common functions for DOM manipulations

const d = document
d.ce = d.createElement
d.gebi = d.getElementById
d.gebc = d.getElementsByClassName
d.qs = d.querySelector
d.qsa = d.querySelectorAll
const w = window
w.st = w.setTimeout
w.si = w.setInterval
w.ci = w.clearInterval
const b = d.body

var mobileResolutionsActive = false

const portfolioItemsDisplayContainer = d.gebi('portfolioItemsDisplayContainer')
const portfolioItemDisplayIFrame = d.gebi('portfolioItemDisplayIFrame')
const fullscreenToggle = d.gebi('fullscreenToggle')
const portfolioItemTabs = d.gebc('portfolio-item-tab')
const displayItemTabs = d.gebc('display-item-tab')
const displayItemMobileTabs = d.gebc('display-item-mobile-tab')
const orientationBtns = d.gebc('orientation-btn')
const portraitOrientationBtn = d.gebi('portraitOrientationBtn')
const landscapeOrientationBtn = d.gebi('landscapeOrientationBtn')

portfolioItemsDisplayContainerBeforeFullscreen = {
	width: null,
	height: null
}

orientationMode = 'portrait'

function activateClickable () {
	for (var i = 0; i < portfolioItemTabs.length; i++) {
		portfolioItemTabs[i].onclick = function () {
			if (!this.classList.contains('active-tab')) {
				d.qs('.portfolio-item-tab.active-tab').classList.remove('active-tab')
				this.classList.add('active-tab')

				portfolioItemDisplayIFrame.src = this.getAttribute('iframeurl')
			}
		}
	}

	for (var i = 0; i < displayItemTabs.length; i++) {
		displayItemTabs[i].onclick = function () {
			if (!this.classList.contains('active-tab')) {
				d.qs('.display-item-tab.active-tab').classList.remove('active-tab')
				this.classList.add('active-tab')

				portfolioItemsDisplayContainer.style.width = this.getAttribute('displaywidth') + 'px'
				portfolioItemsDisplayContainer.style.height = this.getAttribute('displayheight') + 'px'
			}

			if (this.classList.contains('display-item-mobile-tab')) {
				for (var i = 0; i < orientationBtns.length; i++) {
					if (orientationBtns[i].classList.contains('orientation-unavailable')) {
						orientationBtns[i].classList.remove('orientation-unavailable')
					}
				}

				portraitOrientationBtn.classList.add('orientation-selected')
				landscapeOrientationBtn.classList.add('clickable')

				if (landscapeOrientationBtn.classList.contains('orientation-selected')) {
					landscapeOrientationBtn.classList.remove('orientation-selected')
				}
			} else {
				for (var i = 0; i < orientationBtns.length; i++) {
					orientationBtns[i].className = 'orientation-btn orientation-unavailable'
				}
			}
		}
	}

	for (var i = 0; i < orientationBtns.length; i++) {
		orientationBtns[i].onclick = function () {
			if (this.classList.contains('clickable')) {
				d.qs('.orientation-selected').classList.add('clickable')
				d.qs('.orientation-selected').classList.remove('orientation-selected')
				this.classList.remove('clickable')
				this.classList.add('orientation-selected')

				newOrientationWidth = portfolioItemsDisplayContainer.getBoundingClientRect().height
				newOrientationHeight = portfolioItemsDisplayContainer.getBoundingClientRect().width

				portfolioItemsDisplayContainer.style.width = newOrientationWidth + 'px'
				portfolioItemsDisplayContainer.style.height = newOrientationHeight + 'px'
			}
		}
	}

	fullscreenToggle.onclick = function () {
		if (!this.classList.contains('toggled-fullscreen')) {
			this.classList.add('toggled-fullscreen')
			this.innerText = "View Windowed"

			portfolioItemsDisplayContainerBeforeFullscreen.width = portfolioItemsDisplayContainer.getBoundingClientRect().width
			portfolioItemsDisplayContainerBeforeFullscreen.height = portfolioItemsDisplayContainer.getBoundingClientRect().height

			portfolioItemsDisplayContainer.style.width = w.innerWidth + 'px'
			portfolioItemsDisplayContainer.style.height = w.innerHeight + 'px'

			portfolioItemsDisplayContainer.classList.add('portfolio-container-fullscreen')
			portfolioItemDisplayIFrame.classList.add('iframe-container-fullscreen')
		} else {
			this.classList.remove('toggled-fullscreen')
			this.innerText = "View Fullscreen"

			portfolioItemsDisplayContainer.style.width = portfolioItemsDisplayContainerBeforeFullscreen.width + 'px'
			portfolioItemsDisplayContainer.style.height = portfolioItemsDisplayContainerBeforeFullscreen.height + 'px'

			portfolioItemsDisplayContainer.classList.remove('portfolio-container-fullscreen')
			portfolioItemDisplayIFrame.classList.remove('iframe-container-fullscreen')
		}
	}
}

activateClickable()