// Cache window and commonly used window functions
w = window
w.st = w.setTimeout
w.si = w.setInterval

// Cache document and commonly used DOM element selectors
d = document
d.ce = d.createElement
d.gebi = d.getElementById
d.gebc = d.getElementsByClassName
d.gebt = d.getElementsByTagName
d.qs = d.querySelector
d.qsa = d.querySelectorAll

// Cache document body
b = d.body

//Animation variables
slideAnimationTiming = 5
slideAnimationDirection = 'next'
currentSlideImageAnimationOut = 'fadeOut'
nextSlideImageAnimationIn = 'fadeIn'
previousSlideImageAnimationIn = null
animationDuration = 2
animationFillMode = 'forwards'
animationTimingFunction = 'ease-in-out'
currentImage = 0
animationTimerMax = 5
timerUntilAnimation = animationTimerMax
stillTheAnimation = slideAnimationTiming

// Set array of images to images array
images = d.gebc('slideshow-image')
totalImages = images.length

// Effects variables
mainEffectName = null
effectIsActive = false

// Slideshow play direction controls
playSlideshowBackwardsBtn = d.gebi('playSlideshowBackwardsBtn')
playSlideshowForwardsBtn = d.gebi('playSlideshowForwardsBtn')

// Slideshow info, slide number, and speed control variables
currentImageNumber = d.gebi('currentImageNumber')
totalImagesNumber = d.gebi('totalImagesNumber')
currentImageDuration = d.gebi('currentImageDuration')
currentAnimationDuration = d.gebi('currentAnimationDuration')

// Initialize base image number, total images number, and speed numbers
currentImageNumber.innerText = (currentImage + 1).toString()
totalImagesNumber.innerText = totalImages.toString()
currentImageDuration.innerText = slideAnimationTiming.toString()
currentAnimationDuration.innerText = animationDuration.toString()

// Select elements to update upon changing images, times visible, and duration
goToNextImageBtn = d.gebi('goToNextImageBtn')
goToPreviousImageBtn = d.gebi('goToPreviousImageBtn')
decreaseImageDurationBtn = d.gebi('decreaseImageDurationBtn')
increaseImageDurationBtn = d.gebi('increaseImageDurationBtn')
decreaseAnimationDurationBtn = d.gebi('decreaseAnimationDurationBtn')
increaseAnimationDurationBtn = d.gebi('increaseAnimationDurationBtn')

// Planned usage once 3D transforms are added
imageTransitionContext = '2d'
imageFrame = d.gebi('imageFrame')

// Initialize controls position on load
setLayout()

// Add IDs to images
for (var i = 0; i < images.length; i++) {
    images[i].id = `image${i}`
}

// Create animations object for referencing classes containing animations
animations = {
	'fadeIn': {
		animationClass: 'fade-in'
	},
	'fadeOut': {
		animationClass: 'fade-out'
	},
	'slideRightIn': {
		animationClass: 'slide-right-in'
	},
	'slideRightOut': {
		animationClass: 'slide-right-out'
	},
	'slideLeftIn': {
		animationClass: 'slide-left-in'
	},
	'slideLeftOut': {
		animationClass: 'slide-left-out'
	},
	'slideDownIn': {
		animationClass: 'slide-down-in'
	},
	'slideDownOut': {
		animationClass: 'slide-down-out'
	},
	'slideUpIn': {
		animationClass: 'slide-up-in'
	},
	'slideUpOut': {
		animationClass: 'slide-up-out'
	}
}

// Set interval to decrement timerUntilAnimation by 1 every second
w.si(function() {
        timerUntilAnimation--
}, 1000)

// Set interval to check if animation timer has reached 0 or less
w.si(function() {
    if ((timerUntilAnimation + stillTheAnimation) == 0) {
        triggerAnimation()
        resetTimerUntilAnimation()

        if (slideAnimationDirection == 'next') {
            if (currentImage + 1 == images.length) {
                currentImage = 0
            } else {
                currentImage++
            }
        } else if (slideAnimationDirection == 'previous') {
            if (currentImage - 1 < 0 ) {
                currentImage = images.length - 1
            } else {
                currentImage--
            }
        }

        currentImageNumber.innerText = (currentImage + 1).toString()

        setImageFrameSize(currentImage)
    }
}, 1000)


// Function to set timerUntilAnimation to animationTimerMax
function resetTimerUntilAnimation () {
    timerUntilAnimation = animationTimerMax
}

// Function to trigger animation and set new currentImage
function triggerAnimation () {
    imageOut = d.gebi(`image${currentImage}`)

    if (slideAnimationDirection == "next") {
        if (currentImage + 1 == images.length) {            
            imageIn = d.gebi(`image${currentImage}`)
        } else {
            imageIn = d.gebi(`image${currentImage + 1}`)
        }
    } else if (slideAnimationDirection == "previous") {
        if (currentImage - 1 < 0) {
            imageIn = d.gebi(`image${images.length - 1}`)
        } else {
            imageIn = d.gebi(`image${currentImage - 1}`)
        }
    }

	imageOut.classList.add(animations[currentSlideImageAnimationOut].animationClass)
	imageOut.style.animationDuration = animationDuration + 's'
	imageOut.style.animationTimingFunction = animationTimingFunction
	imageOut.style.animationFillMode = animationFillMode

    imageOut.classList.add(animations[currentSlideImageAnimationOut].animationClass)
    imageOut.style.animationDuration = animationDuration + 's'
    imageOut.style.animationFillMode = animationFillMode
    imageOut.style.animationTimingFunction = animationTimingFunction

    if (imageOut.classList.contains('set-above')) {
    	imageOut.classList.remove('set-above')
    }

    if (imageOut.classList.contains('hidden')) {
    	imageOut.classList.remove('hidden')
    }


    if (effectIsActive) {
    	imageIn.classList.add(`${mainEffectName}100`)
    }

    if (imageIn.classList.contains('hidden')) {
    	imageIn.classList.remove('hidden')
    }

    imageIn.classList.add(animations[nextSlideImageAnimationIn].animationClass)
    imageIn.style.animationDuration = animationDuration + 's'
    imageIn.style.animationFillMode = animationFillMode
    imageIn.style.animationTimingFunction = animationTimingFunction

    window.st(function() {
        imageOut.className = 'slideshow-image hidden'
    }, animationDuration * 1000)
}

// Slideshow directional control functions
playSlideshowBackwardsBtn.onclick = function(e) {
    if (slideAnimationDirection != 'previous') {
        d.gebc('direction-btn-selected')[0].classList.remove('direction-btn-selected')
        this.classList.add('direction-btn-selected')
        slideAnimationDirection = 'previous'
        d.gebi('playDirectionMsg').innerText = 'Backwards'
    }
}

playSlideshowForwardsBtn.onclick = function(e) {
    if (slideAnimationDirection != 'next') {
        d.gebc('direction-btn-selected')[0].classList.remove('direction-btn-selected')
        this.classList.add('direction-btn-selected')
        slideAnimationDirection = 'next'
        d.gebi('playDirectionMsg').innerText = 'Forwards'

    }
}

// Adjust slideshow and controls positioning on window resize
function setLayout () {
    if (getLowestDimension() == 'vh') {
        b.className = 'landscape'
    } else {
        b.className = 'portrait'
    }
}

function getLowestDimension () {
    if (w.innerHeight < w.innerWidth) {
        return 'vh'
    } else {
        return 'vw'
    }
}

// Reset control positions if window geometry changes to/from portrait/landscape orientation
w.onresize = setLayout

/* 
	Image frame overlay (for 2D transitions) or underlay (for 3D image transforms)
	I know, this method is different that just putting the slideshow images in a container
	with overflow being hidden. Just trying it out for now. It's basically just setting a 
	transparent div over the size of the current image space with an outline that will have 
	a z-index higher than the images transitioning in 2D so the incoming and outgoing image
	look like they are staying within the frame, and then during 3D transitions will have a 
	z-index lower than the images transforming in 3D since they will go outside the image frame
	space anyway. I'm thinking that by putting a transition on the frame after it's new size for
	the incoming image is might have an interesting effect on how different size images replace
	each other as well. Always a new way to do something! I loved the challenge on Codepen around
	a decade ago that was asking people all the different ways to make a blue box.... hundreds...
*/

function setImageFrameZIndex () {
    if(imageTransitionContext == '2d') {
        imageFrame.style.zIndex = 5
    } else {
        imageFrame.style.index = -1
    }
}

// Initialize image frame on window load
setImageFrameSize(currentImage)

// Call on animate in/out and set to transition duration
function setImageFrameSize (nextCurrentImage) {
    imageFrame.style.transitionDuration = animationDuration + 's'

	// Set image frame to next image in slideshow dimensions
	incomingImage = d.gebi(`image${nextCurrentImage}`)
	imageFrame.style.width = incomingImage.width + 'px'
	imageFrame.style.height = incomingImage.height + 'px'
}

// Animation selections button actions
animationControls = d.gebi('animationControls')
slideAnimations = d.gebi('slideAnimations')

animationControls.onclick = function () {
	if (this.classList.contains('control-selected')) {
		this.classList.remove('control-selected')
		slideAnimations.classList.remove('animation-selection-open')
	} else {
		this.classList.add('control-selected')
		slideAnimations.classList.add('animation-selection-open')
		d.gebi('effectsControls').classList.remove('effects-control-selected')
		d.gebi('slideEffects').classList.remove('effects-selection-open')
	}
}

// #Effects selections button actions

effectsControls = d.gebi('effectsControls')
slideEffects = d.gebi('slideEffects')

effectsControls.onclick = function () {
	if (this.classList.contains('effects-control-selected')) {
		this.classList.remove('effects-control-selected')
		slideEffects.classList.remove('effects-selection-open')
	} else {
		this.classList.add('effects-control-selected')
		slideEffects.classList.add('effects-selection-open')
		d.gebi('animationControls').classList.remove('control-selected')
		d.gebi('slideAnimations').classList.remove('animation-selection-open')
	}
}

// Animation preview button actions
animationPreviewBtns = d.gebc('animation-preview-btn')

for (var i = 0; i < animationPreviewBtns.length; i++) {
	animationPreviewBtns[i].onclick = function () {
		if (!this.classList.contains('animation-preview-selected')) {
			mainAnimationName = this.getAttribute('mainanimationname')

			nextSlideImageAnimationIn = mainAnimationName + 'In'
			currentSlideImageAnimationOut = mainAnimationName + 'Out'

			d.gebc('animation-preview-selected')[0].classList.remove('animation-preview-selected')
			this.classList.add('animation-preview-selected')
		}
	}
}

// #Effects preview button actions
effectPreviewBtns = d.gebc('effect-preview-btn')

for (var i = 0; i < effectPreviewBtns.length; i++) {
	effectPreviewBtns[i].onclick = function() {
		currentEffectName = mainEffectName
		mainEffectName = this.getAttribute('maineffectname')

		if (!effectIsActive) {
			this.classList.add('effect-preview-selected')
			d.gebi(`image${currentImage}`).classList.add(`${mainEffectName}100`)
			effectIsActive = true
		} else {
			if (this.classList.contains('effect-preview-selected')) {
				this.classList.remove('effect-preview-selected')
				d.gebi(`image${currentImage}`).classList.remove(`${mainEffectName}100`)
				effectIsActive = false
			} else {
				d.gebc('effect-preview-selected')[0].classList.remove('effect-preview-selected')
				this.classList.add('effect-preview-selected')
				d.gebi(`image${currentImage}`).classList.remove(`${currentEffectName}100`)
				d.gebi(`image${currentImage}`).classList.add(`${mainEffectName}100`)
			}
		}
	}
}

// Hide pull-out panels on image frame click
imageFrame = d.gebi('imageFrame')

imageFrame.onclick = function () {
	var slideAnimationsPullout = d.gebi('slideAnimations')
	var animationControls = d.gebi('animationControls')
	var effectSelectionsPullout = d.gebi('slideEffects')
	var effectsControls = d.gebi('effectsControls')

	if (slideAnimationsPullout.classList.contains('animation-selection-open')) {
		slideAnimationsPullout.classList.remove('animation-selection-open')
		animationControls.classList.remove('control-selected')
	}

	if (effectSelectionsPullout.classList.contains('effects-selection-open')) {
		effectSelectionsPullout.classList.remove('effects-selection-open')
		effectsControls.classList.remove('effects-control-selected')
	}

	if (infoAndSpeedControls.classList.contains('info-and-speed-controls-open')) {
		infoAndSpeedControls.classList.remove('info-and-speed-controls-open')
	} else {
		infoAndSpeedControls.classList.add('info-and-speed-controls-open')
	}
}

// Slide info and controls

// Initialize current image number
updateCurrentNumber()

function updateCurrentNumber () {
	currentImageNumber.innerText = (currentImage + 1).toString()
}

// Initialize total images number
updateTotalImagesNumber()

function updateTotalImagesNumber () {
	totalImagesNumber.innerText = images.length.toString()
}

// Update image duration
decreaseImageDurationBtn.onclick = function () {
	if (animationTimerMax > animationDuration + 1) {
		animationTimerMax--
		stillTheAnimation = animationTimerMax - 1
		resetTimerUntilAnimation()
		currentImageDuration.innerText = animationTimerMax.toString()
	}
}

increaseImageDurationBtn.onclick = function () {
	animationTimerMax++
	stillTheAnimation = animationTimerMax - 1
	resetTimerUntilAnimation()
	currentImageDuration.innerText = animationTimerMax.toString()
}

// Update animation duration
decreaseAnimationDurationBtn.onclick = function () {
	if (animationDuration > 1) {
		animationDuration--
		currentAnimationDuration.innerText = animationDuration.toString()
	}
}

increaseAnimationDurationBtn.onclick = function () {
	if (animationDuration < animationTimerMax - 1) {
		animationDuration++
		currentAnimationDuration.innerText = animationDuration.toString()
	}
}

// Update image number
goToNextImageBtn.onclick = function () {
	d.gebi(`image${currentImage}`).classList.add('hidden')

	if (currentImage + 1 == images.length) {
		currentImage = 0
	} else {
		currentImage++
	}

	currentImageNumber.innerText = (currentImage + 1).toString()

	d.gebi(`image${currentImage}`).classList.remove('hidden')
}

goToPreviousImageBtn.onclick = function () {
	d.gebi(`image${currentImage}`).classList.add('hidden')
	if (currentImage == 0) {
		currentImage = images.length -1
	} else {
		currentImage--
	}

	currentImageNumber.innerText = (currentImage + 1).toString()

	d.gebi(`image${currentImage}`).classList.remove('hidden')
}
