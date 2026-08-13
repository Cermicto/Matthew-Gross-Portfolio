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
    requestAnimationFrame(function () {
        const date = new Date();

        const second = date.getSeconds() + (date.getMilliseconds() / 1000);

        const phase = (time, cycle) => ((time % cycle) + cycle) % cycle;

        const cubes = d.gebc('cube');
        const arms = d.gebc('hex-arm-container');
        const spiralAni = d.gebi('spiralAni');
        const cornerSecondHands = d.gebc('corner-second-hand');
        const pushCircles = d.gebc('push-circle');

        for (let i = 0; i < cubes.length; i++) {
            cubes[i].style.animationDelay =
                `-${phase(second - 1, 60)}s`;
        }

        for (let i = 0; i < arms.length; i++) {
            arms[i].style.animationDelay =
                `-${phase(second - 15, 60)}s`;
        }

        spiralAni.style.animationDelay =
            `-${phase(second - 15, 60)}s`;

        let addedDelay = 0;

        for (let i = 0; i < cornerSecondHands.length; i++) {
            const handDelay =
                (second + 7.5) - (i * (0.25 + addedDelay));

            cornerSecondHands[i].style.animationDelay = `-${handDelay}s`;

            addedDelay += 0.03;
        }

        for (let i = 0; i < pushCircles.length; i++) {
            pushCircles[i].style.animationDelay =
                `-${phase(second - 2, 60)}s`;
        }
    });
}

function initializeClockAnimations() {
    const cornerSecondHands = d.gebc('corner-second-hand');

    /*
     * Prevent a cold-load frame where all six hands begin at the CSS
     * default position before their individual wall-clock offsets exist.
     */
    for (let i = 0; i < cornerSecondHands.length; i++) {
        cornerSecondHands[i].style.animationPlayState = 'paused';
    }

    setColumnRotationDelay();

    /*
     * setColumnRotationDelay() applies its own delay values on the first
     * animation frame. Resume the edge circles one frame afterward, once
     * their staggered negative delays have been applied.
     */
    requestAnimationFrame(function () {
        requestAnimationFrame(function () {
            for (let i = 0; i < cornerSecondHands.length; i++) {
                cornerSecondHands[i].style.animationPlayState = 'running';
            }
        });
    });
}

if (d.readyState === 'loading') {
    d.addEventListener('DOMContentLoaded', initializeClockAnimations, {
        once: true
    });
} else {
    initializeClockAnimations();
}

setInterval(updateCountdown, 1000);