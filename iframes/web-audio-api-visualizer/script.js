d = document
d.ce = d.createElement
d.qs = d.querySelector
d.qsa = d.querySelectorAll

// Get references to DOM elements
const container = document.getElementById('visualizer-container');
const playButton = document.getElementById('play-button');
const timeDisplay = document.getElementById('time-display');

// Initialize audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const audioElement = new Audio('The-Deep.mp3');
const track = audioContext.createMediaElementSource(audioElement);

// Create an analyser node
const analyser = audioContext.createAnalyser();
analyser.fftSize = 256;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// Connect nodes
track.connect(analyser);
analyser.connect(audioContext.destination);

const barContainer = document.createElement('div');
barContainer.classList.add('bar-container');
container.appendChild(barContainer);

const circleContainer = d.createElement('div')
circleContainer.id = 'circleContainer'
circleContainer.classList.add('circle-container')
d.body.appendChild(circleContainer)

// Generate bars for the audio spectrum
const bars = [];
for (let i = 0; i < bufferLength; i++) {
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.bottom = i * 1.2 + 'vh'
    barContainer.appendChild(bar);
    bars.push(bar);
}

// Generate circles for the audio spectrum
const circles = []
let square = true

for (let i = 0; i < bufferLength; i++) {
    const circle = d.ce('div')

    circle.classList.add('circle')

    if (square) {
        circle.classList.add('square')
    }

    square = !square

    circleContainer.appendChild(circle)
    circles.push(circle)
}

styleChanges = d.qs('#styleChanges')

function updateStyles () {
    verticalLesserBoundary = getWindowLesserBoundary()

    style = `<style>
    .circle-container {
        width: 60${verticalLesserBoundary};
        height: 60${verticalLesserBoundary};
    }
</style>`

    styleChanges.innerHTML = style
}

updateStyles()

function getWindowLesserBoundary () {
    if (window.innerHeight > window.innerWidth) {
        return 'vw'
    } else {
        return 'vh'
    }

}

window.onresize = function () {
    updateStyles()
}

// Handle play/pause functionality
let isPlaying = false;

playButton.addEventListener('click', () => {
    if (!isPlaying) {
        audioContext.resume();
        audioElement.play();
        playButton.textContent = '';
        isPlaying = true;
        animate();
    } else {
        audioElement.pause();
        playButton.textContent = 'Play';
        isPlaying = false;
    }
    playButton.classList.add('playing')
});

audioElement.addEventListener('ended', () => {
    isPlaying = false;
    playButton.textContent = 'Play';
    playButton.classList.remove('playing')
    audioElement.currentTime = 0;
});

// Update time display
audioElement.addEventListener('timeupdate', () => {
    const minutes = Math.floor(audioElement.currentTime / 60);
    const seconds = Math.floor(audioElement.currentTime % 60)
        .toString()
        .padStart(2, '0');
    timeDisplay.textContent = `${minutes}:${seconds}`;
});

// Animation loop
function animate() {
    if (!isPlaying) return;

    requestAnimationFrame(animate);

    analyser.getByteFrequencyData(dataArray);

    // Update bars for the audio spectrum
    for (let i = 0; i < bars.length; i++) {
        const barWidth = (dataArray[i] / 255) * 100;
        bars[i].style.width = `${barWidth}%`;
        bars[i].style.backgroundColor = `rgb(100,0,${barWidth * 2.55})`

        if (i > 5) {
            const scale = (dataArray[i] / 255);

            circles[i].style.transform = `scale(${scale, scale}) rotate(${i * 2.8125}deg)`
            circles[i].style.borderColor = `rgb(200,0,${(scale * 100) * 2.55})`
        }
    }

    // Update circles for the audio spectrum
}

// Request a wake lock
let wakeLock = null;

async function requestWakeLock() {
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    console.log('Wake lock acquired');

    // Add a listener to release the wake lock when the user leaves the page
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        releaseWakeLock();
      }
    });
  } catch (err) {
    console.error('Error acquiring wake lock:', err);
  }
}

function releaseWakeLock() {
  if (wakeLock) {
    wakeLock.release();
    wakeLock = null;
    console.log('Wake lock released');
  }
}

// Call requestWakeLock on a user interaction
document.addEventListener('click', requestWakeLock);