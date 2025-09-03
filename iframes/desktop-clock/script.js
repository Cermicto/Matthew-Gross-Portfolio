d = document
d.gebi = d.getElementById
d.gebc = d.getElementsByClassName
b = d.body

const newRomanNumerals = {
    'time0': 'O',
    'time1': 'I',
    'time2': 'II',
    'time3': 'IIV',
    'time4': 'IV',
    'time5': 'V',
    'time6': 'VI',
    'time7': 'VII',
    'time8': 'IIX',
    'time9': 'IX',
    'time10': 'X',
    'time11': 'XI',
    'time12': 'XII',
    'time13': 'XIIV',
    'time14': 'XIV',
    'time15': 'XV',
    'time16': 'XVI',
    'time17': 'XVI',
    'time18': 'XIIX',
    'time19': 'XIX',
    'time20': 'XX',
    'time21': 'XXI',
    'time22': 'XXII',
    'time23': 'XXIIV',
    'time24': 'XXIV',
    'time25': 'XXV',
    'time26': 'XXVI',
    'time27': 'XXVII',
    'time28': 'XXIIX',
    'time29': 'XXIX',
    'time30': 'XXL',
    'time31': 'XXLI',
    'time32': 'XXLII',
    'time33': 'XXLIIV',
    'time34': 'XXLIV',
    'time35': 'XXLV',
    'time36': 'XXLVI',
    'time37': 'XXLVII',
    'time38': 'XXLIIX',
    'time39': 'XXLIX',
    'time40': 'XL',
    'time41': 'XLI',
    'time42': 'XLII',
    'time43': 'XLIIV',
    'time44': 'XLIV',
    'time45': 'XLV',
    'time46': 'XLVI',
    'time47': 'XLVII',
    'time48': 'XLIIX',
    'time49': 'XLIX',
    'time50': 'L',
    'time51': 'LI',
    'time52': 'LII',
    'time53': 'LIIV',
    'time54': 'LIV',
    'time55': 'LV',
    'time56': 'LVI',
    'time57': 'LVII',
    'time58': 'LIIX',
    'time59': 'LIX'
}

function updateClock() {
    const now = new Date();

    // Date Formatting
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const formattedDate = now.toLocaleDateString(undefined, options);
    d.getElementById('date').textContent = formattedDate;


    // Time Formatting (12-hour)
    let hours = now.getHours();
    const minutes = String(now.getMinutes());
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 24-hour to 12-hour and handle 0 as 12

    d.getElementById('time').textContent = `${newRomanNumerals['time' + hours]}:${newRomanNumerals['time' + minutes.toString()]} ${ampm}`;
}

// Update the clock immediately and then every second
updateClock();
setInterval(updateClock, 1000);

d.addEventListener('mousemove', (e) => {
    const trail = d.createElement('div')

    trail.className = 'trail'

    trail.style.left = `${e.clientX - 5}px`
    trail.style.top = `${e.clientY - 5}px`

    d.body.appendChild(trail)

    setTimeout(function() {
        trail.remove()
    }, 2000)
})

d.addEventListener('touchmove', (e) => {
    const trail = d.createElement('div')

    trail.className = 'trail'

    trail.style.left = `${e.targetTouches[0].clientX - 5}px`
    trail.style.top = `${e.targetTouches[0].clientY - 5}px`

    d.body.appendChild(trail)

    setTimeout(function() {
        trail.remove()
    }, 2000)
})

function updateCountdown() {
    const targetDate = new Date('June 19, 2025 00:00:00').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
        d.querySelector('.timer').innerHTML = '<h1>The date has arrived!</h1>';
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    d.getElementById('days').innerHTML = `<span>${days}</span>`;
}

function setColumnRotationDelay() {
    var date = new Date()

    delay = date.getSeconds()

    cubes = d.gebc('cube')
    arms = d.gebc('hex-arm-container')

    window.setTimeout(function() {
        for (var i = 0; i < cubes.length; i++) {
            cubes[i].setAttribute('style', `animation-delay: -${delay - 1}s`)
        }

        for (var i = 0; i < arms.length; i++) {
            arms[i].setAttribute('style', `animation-delay: -${delay - 15}s`)
        }

        spiralAni = d.gebi('spiralAni')
        spiralAni.setAttribute('style', `animation-delay: -${delay - 15}s`)

        cornerSecondHands = d.gebc('corner-second-hand')
        addedDelay = 0

        for (var i = 0; i < cornerSecondHands.length; i++) {
            cornerSecondHands[i].setAttribute('style', `animation-delay: -${(delay + 7.5) - (i * (0.25 + addedDelay))}s`)
            addedDelay += 0.03
        }

        pushCircles = d.gebc('push-circle')

        for (var i = 0; i < pushCircles.length; i++) {
            pushCircles[i].setAttribute('style', `animation-delay: -${delay - 2}s`)
        }
    }, 50)
}

setColumnRotationDelay()

setInterval(updateCountdown, 1000);